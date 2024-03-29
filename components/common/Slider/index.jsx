/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import Carousel from 'react-slick';
import Image from 'next/image';
import classNames from 'classnames';
import { arrayOf, oneOfType, shape, string, bool } from 'prop-types';
import './styles/_plugin-react-slick.scss';
import { SFullScreenImage } from '../media/SFullScreenImage';

export default function Slider({ slides, className, autoplay, title }) {
  const [fullImage, setFullImage] = useState();

  const renderSlides = () => {
    if (!Array.isArray(slides)) {
      return null;
    }
    return slides.map((slide, idx) => {
      return (
        <div
          tabIndex="0"
          className="Slider__slide"
          role="button"
          onClick={() => setFullImage(slide?.src)}
          key={slide?.id || slide?.title || String(idx)}
        >
          <Image
            loading="lazy"
            layout="fill"
            className="slick-image"
            src={slide?.src || slide}
            alt={slide?.title || 'image'}
          />
          {title && (
            <div className="slick-caption">
              <h4>{title}</h4>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className={classNames('Slider', className)} id="carousel">
      <SFullScreenImage src={fullImage} onClose={() => setFullImage(null)} />
      <div className="Slider__card">
        <Carousel dots infinite speed={500} slidesToShow={1} slidesToScroll={1} autoplay={autoplay}>
          {renderSlides()}
        </Carousel>
      </div>
    </div>
  );
}

Slider.defaultProps = {
  slides: undefined,
  className: undefined,
  autoplay: true,
  title: undefined
};

Slider.propTypes = {
  className: string,
  autoplay: bool,
  title: string,
  slides: arrayOf(oneOfType([string, shape({ id: string, title: string, src: string })]))
};
