import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TeacherCard = ({ className = '' }) => {

  return (
    <li className={classNames("teacher-card", className)}>
      <div className='uk-card uk-card-default'>
        <div className="teacher-card__image-wrapper uk-card-media-top">
            <img className='teachers__image' src="https://i.pravatar.cc/600" alt=""/>
        </div>
        <div className="uk-card-body">
            <h3 className="uk-card-title">Media Top</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </div>
      </div>
    </li>
  )
};

TeacherCard.propTypes = {
  className: PropTypes.string,
}

export default TeacherCard;
