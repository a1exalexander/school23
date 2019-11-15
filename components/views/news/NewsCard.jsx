import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SButton } from '../../index';
import { trancate } from '../../../utils';

const text = `Вважається що термін «козаки», щодо руського населення Великого князівства Литовського, вперше було вжито 1492 року в листуванні великого князя з кримським ханом, який нарікав на похід киян та черкасців під Тягиню. Також на козаків він скаржився московському князеві наступного, 1493 року. Себто українське воїнство хан нарікав відомим собі (татарським/тюркським) словом «Qazaq» — «вільна людина», «авантюрист», «шукач пригод», «бурлака».`;

const NewsCard = ({ className, idx }) => {

  return (
    <div className={classNames('news-card', { image: !(idx % 2) }, className)}>
      {!(idx % 2) && <img className='news-card__image' src='https://picsum.photos/1366/768' alt=""/>}
      <div className='news-card__content'>
        <h2 className='news-card__title'>Тестовий заголовок для для статті на українській мові.</h2>
        <p className='news-card__date'>22.03.2019</p>
        <p className="news-card__text is-mobile">{ trancate(text, idx ? 180 : 200) }</p>
        <p className="news-card__text is-desktop">{ trancate(text, idx ? 200 : 400) }</p>
      </div>
      <div className="news-card__button-wrapper is-desktop">
        <SButton type={idx % 2 ? 'secondary' : 'white'} className='news-card__button'>Переглянути</SButton>
      </div>
    </div>
  )
};

NewsCard.propTypes = {
  className: PropTypes.string,
  idx: PropTypes.number,
}

export default NewsCard;
