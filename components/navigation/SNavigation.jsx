/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Router, useRouter } from 'next/router';
import SNavigationButton from './components/SNavigationButton';
import IconArrowLeft from '../common/icons/IconArrowLeft';
import SNavigationMenu from './SNavigationMenu';
import { routes } from '../../constants';

const SNavigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { route } = useRouter();
  const isHome = ['/'].includes(route);

  const title = (txt) => <h1 className="s-navigation__title">{txt}</h1>;

  useEffect(() => {
    const listener = () => {
      setShowMenu(false);
    };
    Router.events.on('routeChangeStart', listener);
    return () => {
      Router.events.off('routeChangeStart', listener);
    };
  });

  const menuTitle = () => {
    switch (route) {
      case routes.NEWS:
        return title('Шкільні новини');
      case routes.NEWS_POST:
        return title('Шкільні новини');
      case routes.PUBLIC_INFO:
        return title('Публічна Інформація');
      case routes.PUBLIC_INFO_POST:
        return title('Публічна Інформація');
      case routes.CONTACTS:
        return title('Контакти');
      case routes.ADMIN:
        return title('Кабінет адміна');
      case routes.LOGIN:
        return title('Авторизація');
      case routes.SCHOOL_CANTEEN:
        return title('Шкільна їдальня');
      default:
        return null;
    }
  };

  useEffect(() => {
    setShowMenu(false);
  }, [route]);

  return (
    <nav className="s-navigation">
      <div className={classNames('s-navigation__top-bar', { visible: !isHome, active: showMenu })}>
        <SNavigationButton
          onClick={() => setShowMenu(!showMenu)}
          className={classNames('s-navigation__button', { active: showMenu })}
        />
        {isHome && (
          <div className="s-navigation__description">
            <IconArrowLeft className="s-navigation__icon-description animated delay-2s fadeIn" />{' '}
            <span className="s-navigation__description-text animated delay-2s fadeIn">
              Відкрити головне меню
            </span>
          </div>
        )}
        {menuTitle()}
      </div>
      <SNavigationMenu onClose={() => setShowMenu(false)} inProp={showMenu} />
    </nav>
  );
};

export default SNavigation;
