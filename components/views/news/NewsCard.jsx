import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SButton, SBadge } from '../../index';
import { trancate } from '../../../utils';
import moment from 'moment';
import Link from 'next/link';
import { routes } from '../../../constants';

const NewsCard = ({ post, className, idx }) => {
  const postType = post.type === 'post' ? 'Стаття' : 'Оголошення';
  const badgeColor = post.type === 'post' ? 'blue' : 'red';
  const isAnnouncement = post.type === 'announcement';

  const reImg = /<img([^>]*)>/gi;
  const reSrc = /src\s*=\s*"[^">]+/;
  const hasImage = reImg.test(post.text) && !isAnnouncement;
  const imageSrc = hasImage && post.text.match(reSrc)[0].slice(5);
  const textWithoutImages = post.text.replace(/<img([^>]*)>/gi, '');

  return (
      <div className={classNames('news-card', {image: hasImage, announcement: isAnnouncement}, className)}>
        {hasImage && <img className="news-card__image" src={imageSrc} alt="" />}
        <div className="news-card__content">
          <h2 className="news-card__title">{post.title}</h2>
          <div className="news-card__info">
            <SBadge className="news-card__badge" color={badgeColor} label={postType} />
            <span className="news-card__date">
              {moment(post.created * 1000).format('DD.MM.YYYY')}
            </span>
          </div>
          <p
            className="news-card__text is-mobile"
            dangerouslySetInnerHTML={{ __html: trancate(textWithoutImages, idx ? 180 : 200) }}
          ></p>
          <p
            className="news-card__text is-desktop"
            dangerouslySetInnerHTML={{ __html: trancate(textWithoutImages, idx ? 200 : 400) }}
          ></p>
        </div>
        <div className="news-card__button-wrapper">
          <Link href={`${routes.NEWS}/${post.id}`}>
            <a>
              <SButton type={hasImage ? 'white' : 'secondary'} className="news-card__button">
                Переглянути
              </SButton>
            </a>
          </Link>
        </div>
      </div>
  );
};

NewsCard.propTypes = {
  className: PropTypes.string,
  idx: PropTypes.number,
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string,
    created: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  })
};

export default NewsCard;
