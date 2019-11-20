import React, { Fragment } from 'react';
import { STransition, SButton } from '../index';
import { IconRadio, IconSchool, IconMail, IconBooksApple, IconBooks, IconLaws } from '../common/icons';
import SNavigationItem from './components/SNavigationItem';
import SNavigationProfile from './components/SNavigationProfile';
import SNavigationInfo from './components/SNavigationInfo';
import logo from '../../assets/images/Kremenchuk-mini.png';
import Link from 'next/link';
import { routes } from '../../constants';

const SNavigationMenu = ({ inProp = false, onClose }) => {

  return (
    <Fragment>
      <STransition inProp={inProp} name='slideLeft'>
        <div className="nav-menu">
          <div className="nav-menu__inner">
            <div>
              <SNavigationInfo />
              <ul className="nav-menu__list">
                <SNavigationItem href={routes.NEWS} label="Новини" className="nav-menu__item">
                  <IconRadio />
                </SNavigationItem>
                <SNavigationItem href={routes.ABOUT} label="Про школу" className="nav-menu__item">
                  <IconSchool />
                </SNavigationItem>
                <SNavigationItem href={routes.TEACHERS} label="Учительська" className="nav-menu__item">
                  <IconBooksApple />
                </SNavigationItem>
                {/* <SNavigationItem label="Бібліотека" className="nav-menu__item">
                  <IconBooks />
                </SNavigationItem> */}
                <SNavigationItem href={routes.LAW} label="Нормативно-правові акти" className="nav-menu__item">
                  <IconLaws />
                </SNavigationItem>
                <SNavigationItem label="Контактна інформація" className="nav-menu__item">
                  <IconMail />
                </SNavigationItem>
              </ul>
            </div>
            <div>
             <Link href={routes.HOME}>
                <a>
                  <SButton revert type='transparent' className='nav-menu__home-button' label='Головна'>
                    <img src={logo} alt="logo" className="nav-menu__logo"/>
                  </SButton>
                </a>
             </Link>
              {/* TODO: <SNavigationProfile /> */}
            </div>
          </div>
        </div>
      </STransition>
      <STransition
        inProp={inProp}
        timeout={{
          enter: 400,
          exit: 200
        }}
      >
        <div className="nav-menu__layer" onClick={onClose}></div>
      </STransition>
    </Fragment>
  );
};

export default SNavigationMenu;
