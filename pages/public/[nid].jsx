import React, { useState, useEffect } from 'react';
import { bool, func, number, oneOfType, shape, string } from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Page, SButton, STransition, Empty, Meta } from '../../components';
import { SUp } from '../../components';
import Link from 'next/link';
import { routes } from '../../constants';
import { db } from '../../firebase';
import { formatPost } from '../../models/post';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { actions } from '../../store/modules/notifications';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import '../../scss/views/news/_NewsPost.css';
import { useRouter } from 'next/router';

const AdminPublicInfo = dynamic(() => import('../../components/views/admin/AdminPublicInfo'), {
  ssr: false,
});

const initPost = {
  id: '',
  title: '',
  text: '',
  dalta: {
    ops: [],
  },
  created: '',
};

const PublicInfoPage = ({ post = initPost, isAuth, isEmptyInit, notify }) => {
  const [$post, setPost] = useState(post);
  const [state, setState] = useState(false);
  const [isEmpty, setEmpty] = useState(isEmptyInit);

  const router = useRouter();

  const onUpdate = async (updatedPost) => {
    const fetchedPost = await db.getPublicInfo(post.id);
    const newPost = { ...fetchedPost, ...updatedPost };
    const res = await db.updatePublicInfo(post.id, newPost);
    if (res) {
      notify('success', 'Сторінку успішно оновлено!');
      setPost(newPost);
      setState(false);
      window.scrollTo(0, 0);
    } else {
      notify('error', 'Помилка при оновленні! Мабуть картинка занадто важка');
    }
  };

  const getText = (delta = { ops: [] }) => {
    const cfg = { inlineStyles: true };
    const converter = new QuillDeltaToHtmlConverter(delta.ops, cfg);
    return converter.convert();
  };

  const removePost = async () => {
    const res = await db.deletePublicInfo(post.id);
    if (res) {
      notify('success', 'Сторінку видалено!');
      router.push({ pathname: routes.PUBLIC_INFO });
    } else {
      notify('error', 'Помилка при видаленні!');
    }
  };

  const createMarkup = () => ({
    __html: $post.text || getText($post.delta),
  });

  useEffect(() => {
    if (process.browser && !post.id) {
      setEmpty(true);
    }
  }, []);

  return (
    <Page>
      <Meta title={$post.title} ogType="article" />
      <article className="news-post">
        <SUp />
        <header className="news-post__header">
          <div className="news-post__row">
            <SButton onClick={() => router.back()} className="news-post__button-back" size="small">
              Певернутись назад
            </SButton>

            {!isEmpty && isAuth && (
              <>
                {$post.delta && state ? (
                  <SButton
                    onClick={() => setState(false)}
                    type="white"
                    className="news-post__button-edit"
                    size="small"
                  >
                    Відмінити
                  </SButton>
                ) : (
                  <SButton
                    onClick={() => setState(true)}
                    type="white"
                    className="news-post__button-edit"
                    size="small"
                  >
                    Редагувати
                  </SButton>
                )}
                <SButton
                  onClick={removePost}
                  type="danger"
                  className="news-post__button-edit"
                  size="small"
                >
                  Видалиити
                </SButton>
              </>
            )}
          </div>
          {!isEmpty && (
            <div className="news-post__info">
              <span className="news-post__description">
                Від {moment($post.created * 1000).format('DD MMMM, YYYY')}
              </span>
            </div>
          )}
        </header>
        <div className="news-post__container">
          {isEmpty && <Empty text="Поста не існує" />}
          <STransition inProp={!!$post.delta && !!isAuth && !!state}>
            <div className="news-post__popup">
              <AdminPublicInfo isUpdate post={post} onUpdate={onUpdate} />
            </div>
          </STransition>
          <h1 className="news-post__title">{$post.title}</h1>
          <div
            className={classNames('news-post__content')}
            dangerouslySetInnerHTML={createMarkup()}
          ></div>
        </div>
        <div className="news-post__bottom-bar">
          <Link href={routes.NEWS}>
            <a>
              <SButton size="big" type="secondary">
                Переглянути усі новини
              </SButton>
            </a>
          </Link>
        </div>
      </article>
    </Page>
  );
};

PublicInfoPage.propTypes = {
  post: shape({
    id: oneOfType([number, string]),
    title: string,
    text: string,
    type: string,
    created: oneOfType([number, string]),
  }),
  isAuth: bool,
  notify: func,
};

PublicInfoPage.getInitialProps = async ({ query }) => {
  const res = await db.getPublicInfo(query.pid);
  return { post: { ...formatPost(res) }, isEmptyInit: !res.id };
};

export default connect(({ auth: { status } }) => ({ isAuth: status }), { notify: actions.notify })(
  PublicInfoPage
);
