import React from 'react';
import logo from '../../../assets/images/Kremenchuk.png';
import classNames from 'classnames';

const HomeBanner = ({ className }) => {

  return (
    <div className={classNames('home-banner', className)}>
      <div className="home-banner__logo-wrapper animated slower delay-1s fadeIn">
        <img src={logo} alt="logo" className="home-banner__logo"/>
      </div>
      <div className="home-banner__inner">
        <p className="home-banner__title animated slower delay-2s fadeIn">Привіт!</p>
        <h1 className="home-banner__title animated slower delay-3s fadeIn">Ми - школа №23</h1>
      </div>
    </div>
  );
}

export default HomeBanner;
