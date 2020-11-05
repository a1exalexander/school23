import React, { useEffect } from 'react';
import {
  any,
  arrayOf,
  bool,
  func,
  instanceOf,
  node,
  number,
  object,
  oneOf,
  oneOfType,
  shape,
  string,
} from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Meta } from '../Meta';
import Page from '../Page';
import { Empty } from '../common/Empty';
import { SButton, SUp } from '../common/buttons';
import { STransition } from '../common/transition';
import moment from 'moment';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const AdminControls = dynamic(() => import('./components/AdminControls'), { ssr: false });

const Post = ({
  post,
  isAuth,
  onRemove,
  className,
  isEmpty,
  children,
  isEditorVisible,
  onEmptyChange,
  onEditorVisibleChange,
}) => {
  const router = useRouter();

  const getText = (delta = { ops: [] }) => {
    const cfg = { inlineStyles: true };
    const converter = new QuillDeltaToHtmlConverter(delta.ops, cfg);
    return converter.convert();
  };

  const createMarkup = () => {
    if (!post)
      return {
        __html: '',
      };
    return {
      __html: post.text || getText(post.delta),
    };
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (process && process.browser && !post?.id) {
      onEmptyChange(true);
    }
  }, []);

  return (
    <Page>
      <Meta title={post?.title} ogType="article" />
      <article className={classNames("post", className)}>
        <SUp />
        <header className="post__header">
          <div className="post__row">
            <SButton onClick={() => router.back()} className="post__button-back" size="small">
              Певернутись назад
            </SButton>
            <AdminControls visible={!isEmpty && isAuth} active={post?.delta && isEditorVisible} onEditorVisibleChange={onEditorVisibleChange} onRemove={onRemove} />
          </div>
          {!isEmpty && (
            <div className="post__info">
              <span className="post__description">
                Від {moment(post?.created * 1000).format('DD MMMM, YYYY')}
              </span>
            </div>
          )}
        </header>
        <div className="post__container">
          {isEmpty && <Empty text="Поста не існує" />}
          <STransition inProp={!!post?.delta && !!isAuth && !!isEditorVisible}>
            <div className="post__popup">{children}</div>
          </STransition>
          <h1 className="post__title">{post?.title}</h1>
          <div
            className={classNames('post__content', {
              'is-announcement': post?.type === 'announcement',
            })}
            dangerouslySetInnerHTML={createMarkup()}
          ></div>
        </div>
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
  onEditorVisibleChange: () => undefined,
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
        ops: arrayOf(object),
      }),
      created: oneOfType([string, instanceOf(Date), number]),
    }),
    shape({
      id: oneOfType([string, number]),
      title: string,
      type: string,
      text: string,
      dalta: shape({
        ops: arrayOf(object),
      }),
      created: oneOfType([string, instanceOf(Date), number]),
      images: arrayOf(shape({ id: string, src: string })),
    }),
  ]),
  isEditorVisible: bool,
  children: node,
  isEmpty: bool,
  onEmptyChange: func,
  onRemove: func,
  onEditorVisibleChange: func,
};

export default connect(({ auth: { status } }) => ({ isAuth: status }))(Post);
