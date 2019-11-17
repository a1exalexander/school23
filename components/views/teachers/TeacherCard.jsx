import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TeacherCard = ({ className = '' }) => {

  return (
    <li className={classNames("teacher-card", className)}>
      <div className='teacher-card__card uk-card uk-card-default'>
        <div className="teacher-card__image-wrapper uk-card-media-top">
            <img className='teachers__image' src="https://i.pravatar.cc/600" alt=""/>
        </div>
        <div className="uk-card-body teacher-card__body">
            <h3 className="teacher-card__name">Ратушна Ольга Миколаївна</h3>
            <p className="teacher-card__description">Учитель математики</p>
        </div>
      </div>
    </li>
  )
};

TeacherCard.propTypes = {
  className: PropTypes.string,
}

export default TeacherCard;
