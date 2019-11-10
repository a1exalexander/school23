import React from 'react';
import logo from '../../../assets/images/Kremenchuk.png';
import classNames from 'classnames';

const HomeBanner = ({ className }) => {

  return (
    <div className={classNames('home-banner', className)}>
      <div className="home-banner__logo-wrapper animated slow delay-01 fadeIn">
        <img src={logo} alt="logo" className="home-banner__logo"/>
      </div>
      <div className="home-banner__inner">
        <p className="home-banner__title animated slow delay-05 fadeIn">Привіт!</p>
        <h1 className="home-banner__title animated slow delay-1s fadeIn">Ми - школа №23</h1>
      </div>
    </div>
  );
}

export default HomeBanner;
