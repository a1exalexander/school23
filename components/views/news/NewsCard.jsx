/* eslint-disable react/no-danger */
import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { number, oneOfType, shape, string } from 'prop-types';
import classNames from 'classnames';
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
        {hasImage && <img className="news-card__image" src={imageSrc} alt="" />}
        <div className="news-card__content">
          <h2 className="news-card__title">{post?.title}</h2>
          <div className="news-card__info">
            <SBadge className="news-card__badge" color={badgeColor} label={postType} />
            <span className="news-card__date">
              {moment(post?.created * 1000).format('DD.MM.YYYY')}
            </span>
          </div>
          <p
            className="news-card__text is-mobile"
            dangerouslySetInnerHTML={{
              __html: trancate(getContent(textWithoutImages), idx ? 120 : 180)
            }}
          />
          <p
            className="news-card__text is-desktop"
            dangerouslySetInnerHTML={{
              __html: trancate(getContent(textWithoutImages), idx ? 120 : 240)
            }}
          />
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
