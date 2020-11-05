import React from 'react';
import Carousel from 'react-slick';
import { arrayOf, oneOfType, shape, string } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from './components/GridContainer';
import GridItem from './components/GridItem';
import Card from './components/Card';
import carouselStyle from './styles/carouselStyle';
import './styles/_plugin-react-slick.scss';

const useStyles = makeStyles(carouselStyle);

export default function Slider({ slides }) {
  const classes = useStyles();

  const renderSlides = () => {
    if (!Array.isArray(slides)) {
      return null;
    }
    return slides.map((slide, idx) => {
      return (
        <div key={slide?.id || slide?.title || String(idx)}>
          <img src={slide?.src || slide} alt={slide?.title || 'image'} className="slick-image" />
          {slide?.title && (
            <div className="slick-caption">
              <h4>Yellowstone National Park, United States</h4>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="Slider" id="carousel">
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} className={classes.marginAuto}>
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
  slides: undefined
};

Slider.propTypes = {
  slides: arrayOf(oneOfType([string, shape({ id: string, title: string, src: string })]))
};
