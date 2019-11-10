import React, { Fragment } from 'react';
import { STransition, SButton } from '../index';
import { IconRadio, IconSchool, IconMail, IconBooksApple, IconBooks, IconLaws } from '../common/icons';
import SNavigationItem from './components/SNavigationItem';
import SNavigationProfile from './components/SNavigationProfile';
import SNavigationInfo from './components/SNavigationInfo';

const SNavigationMenu = ({ inProp = false, onClose }) => {

  return (
    <Fragment>
      <STransition inProp={inProp} name='slideLeft'>
        <div className="nav-menu">
          {/* TODO: <SButton className='nav-menu__logout' type='secondary' size='small' label='Вийти з аккаунту'/> */}
          <div className="nav-menu__inner">
            <div>
              <SNavigationInfo />
              <ul className="nav-menu__list">
                <SNavigationItem label="Новини" className="nav-menu__item">
                  <IconRadio />
                </SNavigationItem>
                <SNavigationItem label="Про школу" className="nav-menu__item">
                  <IconSchool />
                </SNavigationItem>
                <SNavigationItem label="Учительська" className="nav-menu__item">
                  <IconBooksApple />
                </SNavigationItem>
                <SNavigationItem label="Бібліотека" className="nav-menu__item">
                  <IconBooks />
                </SNavigationItem>
                <SNavigationItem label="Нормативно-правові акти" className="nav-menu__item">
                  <IconLaws />
                </SNavigationItem>
                <SNavigationItem label="Контактна інформація" className="nav-menu__item">
                  <IconMail />
                </SNavigationItem>
              </ul>
            </div>
            {/* TODO: <SNavigationProfile /> */}
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
