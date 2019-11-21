import React, { useState, useEffect } from 'react';
import SNavigationButton from './components/SNavigationButton';
import IconArrowLeft from '../common/icons/IconArrowLeft';
import SNavigationMenu from './SNavigationMenu';
import classNames from 'classnames';
import { routes } from '../../constants';
import { useRouter } from 'next/router';

const SNavigation = () => {

  const [showMenu, setShowMenu] = useState(false);
  const { route } = useRouter();
  const isHome = ['/'].includes(route);

  const title = (title) => <h1 className='s-navigation__title'>{title}</h1>;

  const menuTitle = () => {
    switch (route) {
      case routes.NEWS:
        return title('Шкільні новини');
      case routes.NEWS_POST:
        return title('Шкільні новини');
      case routes.ABOUT:
        return title('Про школу');
      case routes.TEACHERS:
          return title('Наші вчителі');
      case routes.LAW:
        return title('Нормативно-правові акти');
      default:
        return null;
    }
  }

  useEffect(() => {
    setShowMenu(false)
  }, [route])

  return (
    <nav className="s-navigation">
      <div className={classNames('s-navigation__top-bar', {'visible': !isHome, 'active': showMenu})}>
        <SNavigationButton onClick={() => setShowMenu(!showMenu)} className={classNames('s-navigation__button', {'active': showMenu})} />
        {isHome && (<span className="s-navigation__description">
          <IconArrowLeft className="s-navigation__icon-description" />{' '}
          <span className='s-navigation__description-text'>Відкрити головне меню</span>
        </span>)}
        { menuTitle() }
      </div>
      <SNavigationMenu onClose={() => setShowMenu(false)} inProp={showMenu}/>
    </nav>
  );
};

export default SNavigation;
