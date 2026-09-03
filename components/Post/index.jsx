/* eslint-disable no-alert */
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
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Meta } from '../Meta';
import { Page } from '../Page';
import { Empty } from '../common/Empty';
import { SUp } from '../common/buttons';
import { SBadge } from '../index';
import { IconArrowLeft } from '../common/icons';
import { STransitionSwitch } from '../common/transition';
import { SEditorPreview } from '../common/SEditorPreview';
import { SGallery } from '../common/media/SGallery';
import LikeButton from '../common/LikeButton';
import { routes } from '../../constants';

const AdminControls = dynamic(() => import('./components/AdminControls'), { ssr: false });

const getTypeBadge = (post, section) => {
  if (post?.type === 'announcement') return { label: 'Оголошення', color: 'red' };
  if (post?.type === 'post') return { label: 'Стаття', color: 'blue' };
  if (section) return { label: section, color: 'cyan' };
  return null;
};

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
  backHref,
  backLabel,
  section
}) => {
  const router = useRouter();

  const handleRemove = () => {
    const ok = window?.confirm('Точно видаляти?');

    if (!ok) return;
    onRemove();
  };

  const goBack = (e) => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      e.preventDefault();
      router.back();
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (process && process.browser && !post?.id) {
      onEmptyChange(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const created = post?.created ? moment(post.created * 1000) : null;
  const hasImages = Array.isArray(post?.images) && !!post?.images.length;
  const editMode = !!post?.delta && !!isAuth && !!isEditorVisible;
  const isDeltaEmpty = !post?.delta || (post?.delta?.ops && post?.delta?.ops.length === 0);
  const badge = getTypeBadge(post, section);
  const showLikes = !isEmpty && !!post?.id && post?.type !== undefined && post?.type !== '';

  return (
    <Page className={classNames('post', className)}>
      <Meta title={post?.title} ogType="article" />
      <div className="Page__inner">
        <SUp />
        <div className="post__toolbar">
          <Link href={backHref}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <a className="post__back" onClick={goBack}>
              <IconArrowLeft />
              <span>{backLabel}</span>
            </a>
          </Link>
          <div className="post__admin">
            <AdminControls
              visible={!isEmpty && isAuth}
              active={post?.delta && isEditorVisible}
              onEditorVisibleChange={onEditorVisibleChange}
              onRemove={handleRemove}
            />
          </div>
        </div>
        <STransitionSwitch keyProp={editMode}>
          {editMode ? (
            <div className="post__editor">{children}</div>
          ) : (
            <article className="post__article">
              {isEmpty ? (
                <Empty
                  text="Сторінку не знайдено"
                  hint="Можливо, її видалили або посилання застаріло."
                >
                  <Link href={backHref}>
                    <a className="post__back _button">
                      <IconArrowLeft />
                      <span>{backLabel}</span>
                    </a>
                  </Link>
                </Empty>
              ) : (
                <>
                  <header className="post__header">
                    <div className="post__meta">
                      {badge && <SBadge color={badge.color} label={badge.label} />}
                      {created && (
                        <time className="post__date" dateTime={created.format()}>
                          {created.format('D MMMM YYYY')}
                        </time>
                      )}
                    </div>
                    <h1 className="post__title">{post?.title}</h1>
                  </header>
                  {hasImages && (
                    <SGallery className="post__gallery" images={post.images} alt={post?.title} />
                  )}
                  {!!post?.video && (
                    <div className="post__video">
                      <iframe
                        src={`https://www.facebook.com/plugins/video.php?href=${post?.video}&show_text=false&appId=2464432437148222`}
                        scrolling="no"
                        title={post?.title}
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      />
                    </div>
                  )}
                  {post?.text && (
                    <SEditorPreview
                      className="post__content"
                      content={isDeltaEmpty ? post?.text : post?.delta}
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
                  {showLikes && (
                    <footer className="post__footer">
                      <span className="post__footer-text">Сподобалась стаття?</span>
                      <LikeButton post={post} className="post__like-button" showCount />
                    </footer>
                  )}
                </>
              )}
            </article>
          )}
        </STransitionSwitch>
      </div>
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
  backHref: routes.NEWS,
  backLabel: 'Повернутись назад',
  section: undefined
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
  onEditorVisibleChange: func,
  backHref: string,
  backLabel: string,
  section: string
};

export default connect(({ auth: { status } }) => ({ isAuth: status }))(Post);
