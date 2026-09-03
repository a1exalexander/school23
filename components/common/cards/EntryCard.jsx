/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { number, oneOfType, shape, string } from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import Link from 'next/link';
import { IconArrowLeft, IconLaws } from '../icons';
import { getPreviewImage } from '../../../utils/preview';

/**
 * Card for list pages with document-like entries
 * (public information, school activity).
 */
export const EntryCard = ({ post, href, className }) => {
  const image = getPreviewImage(post);
  const date = post?.created ? moment(post.created * 1000).format('D MMMM YYYY') : '';

  return (
    <Link href={href}>
      <a className={classNames('entry-card', { '_with-image': !!image }, className)}>
        <div className="entry-card__media">
          {image ? (
            <img src={image} alt="" loading="lazy" className="entry-card__image" />
          ) : (
            <IconLaws className="entry-card__icon" />
          )}
        </div>
        <div className="entry-card__body">
          <h2 className="entry-card__title">{post.title}</h2>
          {date && (
            <time className="entry-card__date" dateTime={moment(post.created * 1000).format()}>
              {date}
            </time>
          )}
        </div>
        <span className="entry-card__arrow" aria-hidden="true">
          <IconArrowLeft />
        </span>
      </a>
    </Link>
  );
};

EntryCard.defaultProps = {
  className: ''
};

EntryCard.propTypes = {
  className: string,
  href: oneOfType([string, shape({ pathname: string, query: shape({}) })]).isRequired,
  post: shape({
    id: oneOfType([number, string]),
    title: string,
    text: string,
    created: oneOfType([number, string])
  }).isRequired
};

export default EntryCard;
