/* eslint-disable no-alert */
/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import {
  arrayOf,
  bool,
  func,
  instanceOf,
  node,
  number,
  object,
  oneOfType,
  shape,
  string
} from 'prop-types';
import moment from 'moment';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Meta } from '../Meta';
import { Page } from '../Page';
import { Empty } from '../common/Empty';
import { SButton, SUp } from '../common/buttons';
import { STransitionSwitch } from '../common/transition';
import { SEditorPreview } from '../common/SEditorPreview';

const AdminControls = dynamic(() => import('./components/AdminControls'), { ssr: false });
const Slider = dynamic(() => import('../common/Slider'), { ssr: false });

const Post = ({
  post,
  isAuth,
  onRemove,
  className,
  isEmpty,
  children,
  isEditorVisible,
  onEmptyChange,
  onEditorVisibleChange
}) => {
  const router = useRouter();

  const handleRemove = () => {
    const ok = window?.confirm('Точно видаляти?');

    if (!ok) return;
    onRemove();
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (process && process.browser && !post?.id) {
      onEmptyChange(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const date = `Від ${moment(post?.created * 1000).format('DD MMMM, YYYY')}`;
  const hasImages = Array.isArray(post?.images) && !!post?.images.length;
  const editMode = !!post?.delta && !!isAuth && !!isEditorVisible;

  return (
    <Page className={classNames('post', className)}>
      <Meta title={post?.title} ogType="article" />
      <article>
        <SUp />
        <header className="post__header">
          <div className="post__row">
            <SButton onClick={() => router.back()} className="post__button-back" size="small">
              Певернутись назад
            </SButton>
            <AdminControls
              visible={!isEmpty && isAuth}
              active={post?.delta && isEditorVisible}
              onEditorVisibleChange={onEditorVisibleChange}
              onRemove={handleRemove}
            />
          </div>
          {!isEmpty && (
            <div className="post__info">
              <span className="post__description">{date}</span>
            </div>
          )}
        </header>
        <STransitionSwitch keyProp={editMode}>
          {editMode ? (
            <div className="post__container">{children}</div>
          ) : (
            <div className="post__container">
              {isEmpty && <Empty text="Поста не існує" />}

              <div className="post__title-wrapper">
                <h1 className="post__title">{post?.title}</h1>
              </div>
              {hasImages && !isEditorVisible && (
                <Slider className="post__slider" slides={post?.images} />
              )}
              {post?.text && (
                <SEditorPreview
                  className="post__content"
                  content={post?.delta || post?.text}
                  postType={post?.type}
                />
              )}
              {post?.iframe && String(post?.iframe).trim() && (
                <iframe
                  className="post__iframe"
                  title={post?.title}
                  src={post?.iframe}
                  frameBorder="0"
                />
              )}
            </div>
          )}
        </STransitionSwitch>
      </article>
    </Page>
  );
};

Post.defaultProps = {
  className: '',
  post: undefined,
  isAuth: false,
  isEmpty: true,
  children: null,
  isEditorVisible: false,
  onEmptyChange: () => undefined,
  onRemove: () => undefined,
  onEditorVisibleChange: () => undefined
};

Post.propTypes = {
  className: string,
  isAuth: bool,
  post: oneOfType([
    shape({
      id: string,
      title: string,
      text: string,
      dalta: shape({
        ops: arrayOf(oneOfType([object, string, number, bool]))
      }),
      created: oneOfType([string, instanceOf(Date), number])
    }),
    shape({
      id: oneOfType([string, number]),
      title: string,
      type: string,
      text: string,
      dalta: shape({
        ops: arrayOf(oneOfType([object, string, number, bool]))
      }),
      created: oneOfType([string, instanceOf(Date), number]),
      images: arrayOf(shape({ id: string, src: string }))
    })
  ]),
  isEditorVisible: bool,
  children: node,
  isEmpty: bool,
  onEmptyChange: func,
  onRemove: func,
  onEditorVisibleChange: func
};

export default connect(({ auth: { status } }) => ({ isAuth: status }))(Post);
