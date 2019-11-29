import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Page, SButton, STransition, Empty } from '../../components';
import { SUp } from '../../components';
import Link from 'next/link';
import { routes } from '../../constants';
import { db } from '../../firebase';
import { formatPost } from '../../models/post';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { actions } from '../../store/modules/notifications';

const AdminPost = dynamic(() => import('../../components/views/admin/AdminPost'), { ssr: false });

const initPost = {
  id: '',
  title: '',
  text: '',
  type: '',
  created: ''
}

const NewsPost = ({ post = initPost, isAuth, isEmptyInit, notify }) => {
  const [$post, setPost] = useState(post);
  const [state, setState] = useState(false);
  const [isEmpty, setEmpty] = useState(isEmptyInit);

  const onUpdate = async updatedPost => {
    const newPost = { ...post, ...updatedPost };
    const res = await db.updatePost(post.id, newPost);
    if (res) {
      window.scrollTo(0, 0);
      notify('success', 'Пост успішно оновлено!');
      setPost(newPost);
      setState(false);
    } else {
      notify('error', 'Помилка при оновленні!');
    }
  };

  const removePost = async () => {
    const res = await db.deletePost(post.id);
    if (res) {
      notify('success', 'Пост успішно оновлено!');
      setPost(initPost);
      setEmpty(true)
    } else {
      notify('error', 'Помилка при оновленні!');
    }
  };

  const createMarkup = () => ({
    __html: $post.text
  });

  useEffect(() => {
    if (process.browser && !post.id) {
      setEmpty(true);
    }
  }, []);

  return (
    <Page title={$post.title || 'Школа 23'}>
      <article className="news-post">
        <SUp />
        <header className="news-post__header">
          <div className="news-post__row">
            <Link href={routes.NEWS}>
              <a>
                <SButton className="news-post__button-back" size="small">
                  Переглянути усі новини
                </SButton>
              </a>
            </Link>
            {!isEmpty && isAuth && (
              <>
                { state ?
                (<SButton
                  onClick={() => setState(false)}
                  type="white"
                  className="news-post__button-edit"
                  size="small"
                >
                  Назад
                </SButton>) :
                (<SButton
                  onClick={() => setState(true)}
                  type="white"
                  className="news-post__button-edit"
                  size="small"
                >
                  Редагувати
                </SButton>)}
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
                Пост від {moment($post.created * 1000).format('DD.MM.YYYY')}
              </span>
            </div>
          )}
        </header>
        <div className="news-post__container">
          {isEmpty && <Empty text="Поста не існує" />}
          <STransition inProp={isAuth && state}>
            <div className="news-post__popup">
              <AdminPost isUpdate post={post} onUpdate={onUpdate} />
            </div>
          </STransition>
          <h1 className="news-post__title">{$post.title}</h1>
          <div className='news-post__content' dangerouslySetInnerHTML={createMarkup()}></div>
        </div>
        <div className="news-post__bottom-bar">
          <Link href={routes.NEWS}>
            <a>
              <SButton size="big" fluid type="secondary">
                Переглянути усі новини
              </SButton>
            </a>
          </Link>
        </div>
      </article>
    </Page>
  );
};

NewsPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string,
    created: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  isAuth: PropTypes.bool,
  notify: PropTypes.func,
};

NewsPost.getInitialProps = async ({ query }) => {
  const res = await db.getPost(query.nid);
  return { post: { ...formatPost(res) }, isEmptyInit: !res.id };
};

export default connect(({ auth: { status } }) => ({ isAuth: status }), { notify: actions.notify })(NewsPost);
