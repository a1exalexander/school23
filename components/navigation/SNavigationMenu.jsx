/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { bool, func } from 'prop-types';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { STransition, SButton } from '../index';
import { IconRadio, IconSchool, IconMail, IconBooksApple, IconBag } from '../common/icons';
import { SNavigationItem } from './components/SNavigationItem';
import SNavigationInfo from './components/SNavigationInfo';
import logo from '../../assets/images/Kremenchuk-mini.png';

import { routes } from '../../constants';

const SNavigationMenu = ({ inProp, onClose }) => {
  const isAdmin = useSelector((state) => state.auth.status);
  return (
    <>
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
                  href={routes.ACTIVITY}
                  label="Діяльність Гімназії"
                  className="nav-menu__item"
                >
                  <IconBag />
                </SNavigationItem>
                <SNavigationItem
                  href={routes.SCHOOL_CANTEEN}
                  label="Шкільна їдальня"
                  className="nav-menu__item"
                >
                  <IconBooksApple />
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
          exit: 200
        }}
      >
        <div role="button" className="nav-menu__layer" onClick={onClose} />
      </STransition>
    </>
  );
};

SNavigationMenu.defaultProps = {
  inProp: false,
  onClose: () => undefined
};

SNavigationMenu.propTypes = {
  inProp: bool,
  onClose: func
};

export default SNavigationMenu;
