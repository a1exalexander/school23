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
import { formatPost } from '../../models/post';
import { actions } from '../../store/modules/notifications';
import { publicInfoModel } from '../../models/publicInfo';
import Post from '../../components/Post';

const AdminPostEditor = dynamic(() => import('../../components/views/admin/AdminPostEditor'), {
  ssr: false
});

const initPost = {
  ...publicInfoModel,
  id: ''
};

const PublicInfoPage = ({ post, isEmptyInit, notify }) => {
  const [$post, setPost] = useState(post);
  const [isEditorVisible, setEditorVisible] = useState(false);
  const [isEmpty, setEmpty] = useState(isEmptyInit);

  const router = useRouter();

  const onUpdate = async (updatedPost) => {
    const fetchedPost = await db.getPublicInfo(post.id);
    const newPost = { ...fetchedPost, ...updatedPost };
    const res = await db.updatePublicInfo(post.id, newPost);
    if (res) {
      notify('success', 'Сторінку успішно оновлено!');
      setPost(newPost);
      setEditorVisible(false);
      window.scrollTo(0, 0);
    } else {
      notify('error', 'Помилка при оновленні! Мабуть картинка занадто важка');
    }
  };

  const onRemove = async () => {
    const res = await db.deletePublicInfo(post.id);
    if (res) {
      notify('success', 'Сторінку видалено!');
      router.push({ pathname: routes.PUBLIC_INFO });
    } else {
      notify('error', 'Помилка при видаленні!');
    }
  };

  return (
    <Post
      className="_pure"
      post={$post}
      isEmpty={isEmpty}
      isEditorVisible={isEditorVisible}
      onRemove={onRemove}
      onEmptyChange={setEmpty}
      onEditorVisibleChange={setEditorVisible}
    >
      <AdminPostEditor isUpdate post={$post} onUpdate={onUpdate} type="page" />
    </Post>
  );
};

PublicInfoPage.defaultProps = {
  post: initPost,
  isEmptyInit: true,
  notify: () => undefined
};

PublicInfoPage.propTypes = {
  post: shape({
    id: oneOfType([number, string]),
    title: string,
    text: string,
    dalta: shape({
      ops: arrayOf(oneOfType([object, string, number, bool]))
    }),
    created: oneOfType([string, instanceOf(Date), number])
  }),
  isEmptyInit: bool,
  notify: func
};

PublicInfoPage.getInitialProps = async ({ query }) => {
  const res = await db.getPublicInfo(query.pid);
  return { post: { ...formatPost(res) }, isEmptyInit: !res.id };
};

export default connect(null, { notify: actions.notify })(PublicInfoPage);
