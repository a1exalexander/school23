import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import image1 from '../../../assets/images/olga-r.png';

const AboutSliderBoss = ({ className = ''  }) => {

  const slides = [1, 2, 3, 4].map((item, idx) => {
    return (
      <li key={String(idx)}>
          <img src={image1} alt="" className='about-slider-boss__image uk-position-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left' uk-cover='true'/>
          <div className="about-slider-boss__wrapper uk-position-bottom uk-position-small">
              <div uk-slideshow-parallax="x: 400,-400" className='about-slider-boss__content'>
                  <h3 className='about-slider-boss__title'>Ратушна Ольга Миколаївна</h3>
                  <p className='about-slider-boss__year'>з 2008 року</p>
                  <p className='about-slider-boss__about is-desktop'>20.11.2006 року наказом № 597 директором школи № 23 призначена Ратушна Ольга Миколаївна. Ольга Миколаївна прийшла в школу в 2004 році, на посаду заступника директора з навчально-виховної роботи. У 1992 році вона закінчила фізико-математичний факультет Черкаського державного педагогічного інституту. Після закінчення інституту викладала математику в Самарській обл. у військовому гарнізоні Черноречье. У 1996 році приїхала до Кременчука і викладала математику в школі № 19. У 2004 році стала лауреатом обласного етапу конкурсу "Учитель року" в номінації "Математика". В історії нашої школи № 23 Ольга Миколаївна стала першою жінкою директором, і блискуче справляється з настільки важким і відповідальним завданням!</p>
              </div>
          </div>
      </li>
    )
  })

  return (
    <div className={classNames('about-slider-boss', className)}>
      <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex='-1' uk-slideshow='autoplay: true; pause-on-hover: true; ratio: 16:7; min-height: 300;'>
        <ul className="uk-slideshow-items">
          { slides }
        </ul>
        <a
          className="about-slider-boss__arrow uk-position-center-left uk-position-small"
          href="#"
          uk-slidenav-previous="true"
          uk-slideshow-item="previous"
        ></a>
        <a
          className="about-slider-boss__arrow uk-position-center-right uk-position-small"
          href="#"
          uk-slidenav-next="true"
          uk-slideshow-item="next"
        ></a>
        <ul className="uk-dark uk-slideshow-nav uk-dotnav uk-flex-center uk-margin about-slider-boss__dots"></ul>
      </div>
    </div>
  );
};

AboutSliderBoss.propTypes = {
  className: PropTypes.string
};

export default AboutSliderBoss;
