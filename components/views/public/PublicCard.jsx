/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { number, oneOfType, shape, string } from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import Link from 'next/link';
import { routes } from '../../../constants';

export const PublicCard = ({ post, className }) => {
  const reImg = /<img([^>]*)>/gi;
  const reSrc = /src\s*=\s*"[^">]+/;
  const firstImage = post?.images?.[0];
  const hasImage = reImg.test(post?.text) || firstImage;
  const imageSrc = hasImage && (firstImage?.src || post?.text.match(reSrc)[0].slice(5));

  return (
    <Link href={{ pathname: routes.PUBLIC_INFO_POST, query: { pid: post.id } }}>
      <a className={classNames('public-card', className)}>
        <div className="public-card__col">
          <h2 className="public-card__title">{post.title}</h2>

          <span className="public-card__date">
            {moment(post.created * 1000).format('DD MMMM, YYYY')}
          </span>
        </div>
        {hasImage && (
          <div className="public-card__image-wrapper">
            <img className="public-card__image" src={imageSrc} alt={post.title} />
          </div>
        )}
      </a>
    </Link>
  );
};

PublicCard.defaultProps = {
  className: ''
};

PublicCard.propTypes = {
  className: string,
  post: shape({
    id: oneOfType([number, string]),
    title: string,
    text: string,
    created: oneOfType([number, string])
  }).isRequired
};

export default PublicCard;
