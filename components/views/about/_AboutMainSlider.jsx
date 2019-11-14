import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import image1 from '../../../assets/images/s1.jpg';
import image2 from '../../../assets/images/s2.jpg';
import image3 from '../../../assets/images/s3.jpg';

const AboutMainSlider = ({ className = ''  }) => {
  return (
    <div className={className}>
      <div
        className={classNames("s-uk-slider uk-position-relative uk-visible-toggle uk-light")}
        tabIndex="-1"
        uk-slideshow="autoplay: true; animation: push; ratio: 16:7; min-height: 300;"
      >
        <ul className="uk-slideshow-items">
          <li>
            <img src={image1} alt="" uk-cover="true" />
          </li>
          <li>
            <img src={image2} alt="" uk-cover="true" />
          </li>
          <li>
            <img src={image3} alt="" uk-cover="true" />
          </li>
        </ul>
        <a
          className="uk-position-center-left uk-position-small"
          href="#"
          uk-slidenav-previous="true"
          uk-slideshow-item="previous"
        ></a>
        <a
          className="uk-position-center-right uk-position-small"
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
