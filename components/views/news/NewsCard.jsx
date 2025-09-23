/* eslint-disable react/no-danger */
import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { number, oneOfType, shape, string } from 'prop-types';
import classNames from 'classnames';
import Image from 'next/image';
import { SButton, SBadge } from '../../index';
import { trancate } from '../../../utils';
import { routes } from '../../../constants';
import { getContent } from '../../../utils/truncate';


const NewsCard = ({ post, className, idx }) => {
  const postType = post?.type === 'post' ? 'Стаття' : 'Оголошення';
  const badgeColor = post?.type === 'post' ? 'blue' : 'red';
  const isAnnouncement = post?.type === 'announcement';

  const reImg = /<img([^>]*)>/gi;
  const reSrc = /src\s*=\s*"[^">]+/;
  const firstImage = post?.images?.[0];
  const hasImage = (reImg.test(post?.text) || firstImage) && !isAnnouncement;
  const imageSrc = hasImage && (firstImage?.src || post?.text.match(reSrc)[0].slice(5));
  const textWithoutImages = post?.text.replace(/<img([^>]*)>/gi, '');
  const text = getContent(textWithoutImages) || post.title;

  const hasContent = !!textWithoutImages;

  const router = useRouter();

  return (
    <Link href={{ pathname: routes.NEWS_POST, query: { nid: post.id } }}>
      <a
        className={classNames(
          'news-card',
          { 'with-image': hasImage, announcement: isAnnouncement },
          className
        )}
      >
        {hasImage && (
          <Image
            unoptimized
            loading="lazy"
            layout="fill"
            className="news-card__image"
            src={imageSrc}
            alt={post?.title}
          />
        )}
        <div className="news-card__content">
          {hasContent && <h2 className="news-card__title">{post?.title}</h2>}
          <div className="news-card__info">
            <SBadge className="news-card__badge" color={badgeColor} label={postType} />
            <span className="news-card__date">
              {moment(post?.created * 1000).format('DD.MM.YYYY')}
            </span>
          </div>
          <p
            className="news-card__text is-mobile"
            dangerouslySetInnerHTML={{
              __html: trancate(text, hasContent ? 80 : 120)
            }}
          />
          <p
            className="news-card__text is-desktop"
            dangerouslySetInnerHTML={{
              __html: trancate(text, hasContent ? 120 : 220)
            }}
          />
        </div>
        <div className="news-card__footer">
          <div className="news-card__like-counter">
            <svg className="like-counter__icon" viewBox="0 0 24 24" fill="#e91e63">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="like-counter__count">{post?.likes || 0}</span>
          </div>
          <div className="news-card__button-wrapper">
            <SButton
              onClick={(e) => {
                if (e) e.preventDefault();
                router.push({ pathname: routes.NEWS_POST, query: { nid: post.id } });
              }}
              type={hasImage ? 'white' : 'secondary'}
              className="news-card__button"
            >
              Переглянути
            </SButton>
          </div>
        </div>
      </a>
    </Link>
  );
};

NewsCard.defaultProps = {
  className: undefined,
  idx: undefined,
  post: undefined
};

NewsCard.propTypes = {
  className: string,
  idx: number,
  post: shape({
    id: oneOfType([number, string]),
    title: string,
    text: string,
    type: string,
    created: oneOfType([number, string])
  })
};

export default NewsCard;
