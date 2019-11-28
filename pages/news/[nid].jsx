import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Page, SButton, STransitionSwitch, STransition, Empty } from '../../components';
import { SUp } from '../../components';
import Link from 'next/link';
import { routes } from '../../constants';
import content from './test.json';
import { db } from '../../firebase';
import { formatPost } from '../../models/post';
import moment from 'moment';
import dynamic from 'next/dynamic';

const AdminPost = dynamic(() => import('../../components/views/admin/AdminPost'), { ssr: false });

const NewsPost = ({ post, isAuth }) => {
  const [state, setState] = useState(false);
  const [isEmpty, setEmpty] = useState(false);

  const onUpdate = async updatedPost => {
    const newPost = { ...post, ...updatedPost };
    const res = await db.updatePost(post.id, newPost);
    if (res) {
      notify('success', 'Пост успішно оновлено!');
    } else {
      notify('error', 'Помилка при оновленні!');
    }
    setState(false);
    location.reload();
  };

  const removePost = async () => {};

  const createMarkup = () => ({
    __html: post.text
  });

  useEffect(() => {
    if (process.browser && !post.id) {
      setEmpty(true);
    }
  }, []);

  return (
    <Page title={post.title}>
      <article className="news-post">
        <SUp />
        <header className="news-post__header">
          <div className="news-post__row">
            <Link href={routes.NEWS}>
              <a>
                <SButton className="news-post__button-back is-desktop" size="small">
                  Переглянути усі новини
                </SButton>
              </a>
            </Link>
            {!isEmpty && isAuth && (
              <>
                <SButton
                  onClick={() => setState(true)}
                  type="warn"
                  className="news-post__button-edit"
                  size="small"
                >
                  Редагувати
                </SButton>
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
                Пост від {moment(post.created * 1000).format('DD.MM.YYYY')}
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
          <h1 className="news-post__title">{post.title}</h1>
          <div dangerouslySetInnerHTML={createMarkup()}></div>
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
  isAuth: PropTypes.bool
};

NewsPost.getInitialProps = async ({ query }) => {
  const res = await db.getPost(query.nid);
  return { post: { ...formatPost(res), id: query.nid } };
};

export default connect(({ auth: { status } }) => ({ isAuth: status }))(NewsPost);
