import React, { Fragment, useEffect } from 'react';
import { STransition, SButton } from '../index';
import { IconRadio, IconSchool, IconMail } from '../common/icons';
import SNavigationItem from './components/SNavigationItem';
import SNavigationInfo from './components/SNavigationInfo';
import logo from '../../assets/images/Kremenchuk-mini.png';
import Link from 'next/link';
import { routes } from '../../constants';
import { useSelector } from 'react-redux';

const SNavigationMenu = ({ inProp = false, onClose }) => {
  const isAdmin = useSelector((state) => state.auth.status);
  useEffect(() => {
      console.log('isAdmin', isAdmin);
  })
  return (
    <Fragment>
      <STransition inProp={inProp} name="slideLeft">
        <div className="nav-menu">
          <div className="nav-menu__inner">
            <div>
              <SNavigationInfo />
              <ul className="nav-menu__list">
                <SNavigationItem href={routes.NEWS} label="Новини" className="nav-menu__item">
                  <IconRadio />
                </SNavigationItem>
                <SNavigationItem
                  href={routes.PUBLIC_INFO}
                  label="Публічна Інформація"
                  className="nav-menu__item"
                >
                  <IconSchool />
                </SNavigationItem>
                <SNavigationItem
                  href={routes.CONTACTS}
                  label="Контактна інформація"
                  className="nav-menu__item"
                >
                  <IconMail />
                </SNavigationItem>
              </ul>
            </div>
            <div>
              <Link href={routes.HOME}>
                <a>
                  <SButton
                    revert
                    type="transparent"
                    className="nav-menu__home-button"
                    label="Головна"
                  >
                    <img src={logo} alt="logo" className="nav-menu__logo" />
                  </SButton>
                </a>
              </Link>
              {isAdmin && (
                <Link href={routes.ADMIN}>
                  <a>
                    <SButton type="transparent">Кабінет Адміна</SButton>
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </STransition>
      <STransition
        inProp={inProp}
        timeout={{
          enter: 400,
          exit: 200,
        }}
      >
        <div className="nav-menu__layer" onClick={onClose}></div>
      </STransition>
    </Fragment>
  );
};

export default SNavigationMenu;
