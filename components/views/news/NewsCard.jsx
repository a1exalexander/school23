/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { bool, number, oneOfType, shape, string } from 'prop-types';
import classNames from 'classnames';
import { SBadge } from '../../index';
import { IconRadio } from '../../common/icons';
import { routes } from '../../../constants';
import { getExcerpt, getPreviewImage } from '../../../utils/preview';
import { isTitleRepeated, normalizePost } from '../../../utils/postTitle';

const NewsCard = ({ post: rawPost, className, featured }) => {
  // old posts may still have the whole article in the title
  const post = normalizePost(rawPost);
  const isAnnouncement = post?.type === 'announcement';
  const postType = isAnnouncement ? 'Оголошення' : 'Стаття';
  const badgeColor = isAnnouncement ? 'red' : 'blue';

  const image = isAnnouncement ? null : getPreviewImage(post);
  const excerpt = getExcerpt(post?.text, featured ? 320 : 200);
  // a title made of the first words of the body would only repeat the excerpt
  const hideTitle = !!excerpt && isTitleRepeated(post);
  const created = post?.created ? moment(post.created * 1000) : null;

  return (
    <Link href={{ pathname: routes.NEWS_POST, query: { nid: post.id } }}>
      <a
        className={classNames(
          'news-card',
          { '_with-image': !!image, _announcement: isAnnouncement, _featured: featured },
          className
        )}
      >
        <div className="news-card__media">
          {image ? (
            <img src={image} alt="" loading="lazy" className="news-card__image" />
          ) : (
            <div className="news-card__placeholder" aria-hidden="true">
              <IconRadio />
            </div>
          )}
          <SBadge className="news-card__badge" color={badgeColor} label={postType} />
        </div>
        <div className="news-card__body">
          {created && (
            <time className="news-card__date" dateTime={created.format()}>
              {created.format('D MMMM YYYY')}
            </time>
          )}
          {/* a hidden title still names the link for screen readers and search engines */}
          <h2 className={classNames('news-card__title', { 'is-visually-hidden': hideTitle })}>
            {post?.title}
          </h2>
          {excerpt && (
            <p className="news-card__excerpt" dangerouslySetInnerHTML={{ __html: excerpt }} />
          )}
          <div className="news-card__footer">
            <span className="news-card__likes" aria-label={`${post?.likes || 0} вподобань`}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {post?.likes || 0}
            </span>
            <span className="news-card__more">Читати далі</span>
          </div>
        </div>
      </a>
    </Link>
  );
};

NewsCard.defaultProps = {
  className: undefined,
  featured: false,
  post: undefined
};

NewsCard.propTypes = {
  className: string,
  featured: bool,
  post: shape({
    id: oneOfType([number, string]),
    title: string,
    text: string,
    type: string,
    likes: number,
    created: oneOfType([number, string])
  })
};

export default NewsCard;
