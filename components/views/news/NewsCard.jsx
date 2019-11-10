import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SButton } from '../../index';
import { trancate } from '../../../utils';

const text = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi aspernatur deserunt dolore laudantium inventore, eaque quod illo quaerat, omnis vitae minus facere soluta accusamus corrupti. Possimus ipsum a dolores eius eum iure, quae odit placeat pariatur minima tenetur ad, vitae molestiae omnis suscipit. Excepturi sed, iusto quisquam odio minus delectus exercitationem? Dicta, nostrum expedita ratione voluptas sequi atque facere blanditiis quam ad, veritatis eaque qui. Fugiat cumque natus pariatur porro iste cum, molestias nihil ipsum consectetur illum et beatae accusantium ullam nam commodi deleniti at! Ab magni incidunt ullam, eos amet adipisci. Aspernatur blanditiis error deleniti dolores a! Autem, explicabo! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi aspernatur deserunt dolore laudantium inventore, eaque quod illo quaerat, omnis vitae minus facere soluta accusamus corrupti. Possimus ipsum a dolores eius eum iure, quae odit placeat pariatur minima tenetur ad, vitae molestiae omnis suscipit. Excepturi sed, iusto quisquam odio minus delectus exercitationem? Dicta, nostrum expedita ratione voluptas sequi atque facere blanditiis quam ad, veritatis eaque qui. Fugiat cumque natus pariatur porro iste cum, molestias nihil ipsum consectetur illum et beatae accusantium ullam nam commodi deleniti at! Ab magni incidunt ullam, eos amet adipisci. Aspernatur blanditiis error deleniti dolores a! Autem, explicabo!`;

const NewsCard = ({ className, idx }) => {

  return (
    <div className={classNames('news-card', { image: !(idx % 2) }, className)}>
      {!(idx % 2) && <img className='news-card__image' src='https://picsum.photos/1366/768' alt=""/>}
      <div className='news-card__content'>
        <h2 className='news-card__title'>Lorem ipsum dolor sit amet consectetur.</h2>
        <p className='news-card__date'>22.03.2019</p>
        <p className="news-card__text is-mobile">{ trancate(text, idx ? 180 : 200) }</p>
        <p className="news-card__text is-desktop">{ trancate(text, idx ? 200 : 400) }</p>
      </div>
      <div className="news-card__button-wrapper">
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
