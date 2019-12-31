import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Page, SButton, STransition, Empty } from '../../components';
import { SUp } from '../../components';
import Link from 'next/link';
import { routes } from '../../constants';
import { db } from '../../firebase';
import { formatPost, getComment, getReply } from '../../models/post';
import moment from 'moment';
import { handleChange } from '../../components/common/form/handleChange';
import dynamic from 'next/dynamic';
import { actions } from '../../store/modules/notifications';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import '../../scss/views/news/_NewsPost.css';
const AdminPost = dynamic(() => import('../../components/views/admin/AdminPost'), { ssr: false });

const initPost = {
  id: '',
  title: '',
  text: '',
  dalta: {
    ops: []
  },
  type: '',
  created: '',
  comments: []
};

const NewsPost = ({ post = initPost, isAuth, isEmptyInit, notify }) => {
  const [$post, setPost] = useState(post);
  const [state, setState] = useState(false);
  const [isEmpty, setEmpty] = useState(isEmptyInit);
  const [comment, setComment] = useState(getComment());
  const [reply, setReply] = useState(getReply());
  const [loading, setLoading] = useState({ comment: false, reply: false });

  const isAnnouncement = post.type === 'announcement';

  const onUpdate = async updatedPost => {
    const fetchedPost = await db.getPost(post.id);
    const newPost = { ...fetchedPost, ...updatedPost };
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

  const getText = (delta = { ops: [] }) => {
    const cfg = { inlineStyles: true };
    const converter = new QuillDeltaToHtmlConverter(delta.ops, cfg);
    return converter.convert();
  };

  const removePost = async () => {
    const res = await db.deletePost(post.id);
    if (res) {
      notify('success', 'Пост успішно оновлено!');
      setPost(initPost);
      setEmpty(true);
    } else {
      notify('error', 'Помилка при оновленні!');
    }
  };

  const onLoading = (type, value) => {
    setLoading(ps => ({ ...ps, [type]: value }));
  };

  const createMarkup = () => ({
    __html: $post.text || getText($post.delta)
  });

  const handleComment = param => value => {
    setComment(prevState => ({ ...prevState, [param]: value }));
  };

  const handleReply = param => value => {
    setReply(prevState => ({ ...prevState, [param]: value }));
  };

  const onReply = (id = '', name = '') => {
    handleReply('target')(id);
    handleReply('targetName')(name);
  };

  const sendComment = async newPost => {
    const res = await db.updatePost(post.id, newPost);
    if (res) {
      setPost(newPost);
      setComment(getComment());
      setReply(getReply());
    } else {
      notify('error', 'Помилка при коментуванні!');
    }
    onLoading('comment', false);
  };

  const onSendComment = async () => {
    onLoading('comment', true);
    const newPost = await db.getPost(post.id);
    newPost.comments.push(getComment(comment));
    await sendComment(newPost);
  };

  const onSendReply = async () => {
    onLoading('comment', true);
    const newPost = await db.getPost(post.id);
    const idx = newPost.comments.findIndex(({ id }) => id === reply.target);
    newPost.comments[idx].reply.push(getReply(reply));
    await sendComment(newPost);
  };

  const deleteComment = async (commentId) => {
    const newPost = await db.getPost(post.id);
    const idx = newPost.comments.findIndex(({ id }) => id === commentId);
    newPost.comments.splice(idx, 1);
    await sendComment(newPost);
  };

  const deleteReply = async ({ id, target }) => {
    const newPost = await db.getPost(post.id);
    const idx = newPost.comments.findIndex(({ id }) => id === target);
    const replyIdx = newPost.comments[idx].reply.findIndex((item) => item.id === id);
    newPost.comments[idx].reply.splice(replyIdx, 1);
    await sendComment(newPost);
  };

  useEffect(() => {
    if (process.browser && !post.id) {
      setEmpty(true);
    }
  }, []);

  const replyForm = (
    <div key="reply" className="news-post__reply-form">
      <div className="field">
        <p className="control">
          <input
            className="input"
            value={reply.name}
            onChange={handleChange(handleReply('name'))}
            placeholder="Ім'я"
            type="text"
          />
        </p>
      </div>
      <div className="field">
        <p className="control">
          <textarea
            value={reply.text}
            onChange={handleChange(handleReply('text'))}
            className="textarea"
            placeholder="Коментар..."
          ></textarea>
        </p>
      </div>
      <div className="field">
        <p className="control">
          <SButton onClick={onSendReply} loading={loading.reply}>
            Відповісти
          </SButton>
        </p>
      </div>
    </div>
  );

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
                {$post.delta && state ? (
                  <SButton
                    onClick={() => setState(false)}
                    type="white"
                    className="news-post__button-edit"
                    size="small"
                  >
                    Назад
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
                Пост від {moment($post.created * 1000).format('DD.MM.YYYY')}
              </span>
            </div>
          )}
        </header>
        <div className="news-post__container">
          {isEmpty && <Empty text="Поста не існує" />}
          <STransition inProp={!!$post.delta && !!isAuth && !!state}>
            <div className="news-post__popup">
              <AdminPost isUpdate post={post} onUpdate={onUpdate} />
            </div>
          </STransition>
          <h1 className="news-post__title">{$post.title}</h1>
          <div className={classNames("news-post__content", {'is-announcement': isAnnouncement})} dangerouslySetInnerHTML={createMarkup()}></div>
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
        {!isEmpty && !state && <section className="news-post__comments">
          <h3 className="news-post__heading">Коментарі</h3>
          {$post.comments.map(item => (
            <article key={item.id} className="media">
             { isAuth && <a onClick={() => deleteComment(item.id)} class="delete"></a>}
              <figure className="media-left"></figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <span className='news-post__commentator'>{item.name}</span>
                    <span className='news-post__comment-text'>{item.text}</span>
                    <small>
                      <a onClick={() => onReply(item.id, item.name)}>Reply</a> ·{' '}
                      {moment(item.date, 'DD.MM.YYYY HH:mm:ss').fromNow()}
                    </small>
                  </p>
                </div>
                {item.reply.map(subitem => (
                  <article key={subitem.id} className="media">
                    { isAuth && <a onClick={() => deleteReply(subitem)} class="delete"></a>}
                    <figure className="media-left">
                      <p className="image is-48x48"></p>
                    </figure>
                    <div className="media-content">
                      <div className="content">
                        <p>
                          <span className='news-post__commentator'>{subitem.name}</span>
                          <span className="tag is-light">@{subitem.targetName} ↴</span>
                          <span className='news-post__comment-text'>
                            {subitem.text}
                          </span>
                          <small>
                            <a onClick={() => onReply(item.id, subitem.name)}>Reply</a> ·{' '}
                            {moment(subitem.date, 'DD.MM.YYYY HH:mm:ss').fromNow()}
                          </small>
                        </p>
                      </div>
                    </div>
                  </article>
                )).concat(reply.target && reply.target === item.id && replyForm)}
              </div>
            </article>
          ))}
          <article className="media">
            <div className="media-content">
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    value={comment.name}
                    onChange={handleChange(handleComment('name'))}
                    placeholder="Ім'я"
                    type="text"
                  />
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <textarea
                    value={comment.text}
                    onChange={handleChange(handleComment('text'))}
                    className="textarea"
                    placeholder="Коментар..."
                  ></textarea>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <SButton onClick={onSendComment} loading={loading.comment}>
                    Опублікувати кементар
                  </SButton>
                </p>
              </div>
            </div>
          </article>
        </section>}
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
  notify: PropTypes.func
};

NewsPost.getInitialProps = async ({ query }) => {
  const res = await db.getPost(query.nid);
  return { post: { ...formatPost(res) }, isEmptyInit: !res.id };
};

export default connect(({ auth: { status } }) => ({ isAuth: status }), { notify: actions.notify })(
  NewsPost
);
