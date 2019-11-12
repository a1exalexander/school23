import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const AboutMainSlider = ({ className }) => {
  return (
    <div className={className}>
      <div
        className={classNames("s-uk-slider uk-position-relative uk-visible-toggle uk-light")}
        tabIndex="-1"
        uk-slideshow="animation: push; ratio: 12:6;"
      >
        <ul className="uk-slideshow-items">
          <li>
            <img src='images/s1.jpg' alt="" uk-cover="true" />
          </li>
          <li>
            <img src='images/s2.jpg' alt="" uk-cover="true" />
          </li>
          <li>
            <img src='images/s3.jpg' alt="" uk-cover="true" />
          </li>
        </ul>
        <a
          className="uk-position-center-left uk-position-small uk-hidden-hover"
          href="#"
          uk-slidenav-previous="true"
          uk-slideshow-item="previous"
        ></a>
        <a
          className="uk-position-center-right uk-position-small uk-hidden-hover"
          href="#"
          uk-slidenav-next="true"
          uk-slideshow-item="next"
        ></a>
      </div>
    </div>
  );
};

AboutMainSlider.propTypes = {
  className: PropTypes.string
};

export default AboutMainSlider;
