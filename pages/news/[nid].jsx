import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
  arrayOf,
  bool,
  func,
  instanceOf,
  number,
  object,
  oneOfType,
  shape,
  string
} from 'prop-types';
import { connect } from 'react-redux';
import { routes } from '../../constants';
import { db } from '../../firebase';
import { formatPost, postModel } from '../../models/post';
import { actions } from '../../store/modules/notifications';
import Post from '../../components/Post';

const AdminPostEditor = dynamic(() => import('../../components/views/admin/AdminPostEditor'), {
  ssr: false
});

const initPost = {
  ...postModel,
  id: ''
};

const NewsPost = ({ post, isEmptyInit, notify }) => {
  const [$post, setPost] = useState(post);
  const [isEditorVisible, setEditorVisible] = useState(false);
  const [isEmpty, setEmpty] = useState(isEmptyInit);

  const router = useRouter();

  const onUpdate = async (updatedPost) => {
    const fetchedPost = await db.getPost(post.id);
    const newPost = { ...fetchedPost, ...updatedPost };
    const res = await db.updatePost(post.id, newPost);
    if (res) {
      window.scrollTo(0, 0);
      notify('success', 'Пост успішно оновлено!');
      setPost(newPost);
      setEditorVisible(false);
    } else {
      notify('error', 'Помилка при оновленні! Мабуть картинка занадто важка');
    }
  };

  const onRemove = async () => {
    const res = await db.deletePost(post.id);
    if (res) {
      notify('success', 'Пост видалено!');
      router.push({ pathname: routes.NEWS });
    } else {
      notify('error', 'Помилка при видаленні!');
    }
  };

  return (
    <Post
      post={$post}
      isEmpty={isEmpty}
      isEditorVisible={isEditorVisible}
      onRemove={onRemove}
      onEmptyChange={setEmpty}
      onEditorVisibleChange={setEditorVisible}
    >
      <AdminPostEditor isUpdate post={$post} onUpdate={onUpdate} />
    </Post>
  );
};

NewsPost.defaultProps = {
  post: initPost,
  notify: () => undefined,
  isEmptyInit: true
};

NewsPost.propTypes = {
  post: shape({
    id: oneOfType([number, string]),
    title: string,
    text: string,
    type: string,
    dalta: shape({
      ops: arrayOf(oneOfType([object, string, number, bool]))
    }),
    created: oneOfType([string, instanceOf(Date), number]),
    images: arrayOf(shape({ id: string, src: string }))
  }),
  notify: func,
  isEmptyInit: bool
};

NewsPost.getInitialProps = async ({ query }) => {
  const res = await db.getPost(query.nid);
  return { post: { ...formatPost(res) }, isEmptyInit: !res.id };
};

export default connect(null, { notify: actions.notify })(NewsPost);
