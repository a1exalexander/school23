/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import Carousel from 'react-slick';
import classNames from 'classnames';
import { arrayOf, oneOfType, shape, string } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from './components/GridContainer';
import GridItem from './components/GridItem';
import Card from './components/Card';
import carouselStyle from './styles/carouselStyle';
import './styles/_plugin-react-slick.scss';
import { SFullScreenImage } from '../media/SFullScreenImage';

const useStyles = makeStyles(carouselStyle);

export default function Slider({ slides, className }) {
  const classes = useStyles();
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
          <img src={slide?.src || slide} alt={slide?.title || 'image'} className="slick-image" />
        </div>
      );
    });
  };

  return (
    <div className={classNames('Slider', className)} id="carousel">
      <SFullScreenImage src={fullImage} onClose={() => setFullImage(null)} />
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={10} md={10} className={classes.marginAuto}>
            <Card>
              <Carousel dots infinite speed={500} slidesToShow={1} slidesToScroll={1} autoplay>
                {renderSlides()}
              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

Slider.defaultProps = {
  slides: undefined,
  className: undefined
};

Slider.propTypes = {
  className: string,
  slides: arrayOf(oneOfType([string, shape({ id: string, title: string, src: string })]))
};
