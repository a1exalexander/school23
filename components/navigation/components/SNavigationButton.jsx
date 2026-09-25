import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { bool, func, string } from 'prop-types';
import { useRouter } from 'next/router';
import { routes } from '../../../constants';

const SNavigationButton = ({ className, onClick, expanded }) => {
  const { route } = useRouter();
  const isLight = [routes.HOME, routes.ABOUT].includes(route);
  const [isDark, setIsDark] = useState(false);

  const handleScroll = () => {
    if (process.browser) {
      const h = Math.max(window.innerHeight - 30 || 0);
      switch (route) {
        case routes.ABOUT:
          setIsDark(window.pageYOffset > h);
          break;
        default:
          setIsDark(false);
          break;
      }
    }
  };

  useEffect(() => {
    if (process.browser && route === routes.ABOUT) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (process.browser && route === routes.ABOUT) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [route]);

  return (
    <div className={classNames('s-navigation-button', className, { dark: !isLight || isDark })}>
      <button
        type="button"
        onClick={onClick}
        className="s-navigation-button__button"
        aria-label={expanded ? 'Закрити меню' : 'Відкрити меню'}
        aria-expanded={!!expanded}
      >
        <div className="s-navigation-button__dot" />
        <div className="s-navigation-button__dot" />
        <div className="s-navigation-button__dot" />
        <div className="s-navigation-button__dot" />
      </button>
    </div>
  );
};

SNavigationButton.defaultProps = {
  className: undefined,
  onClick: () => undefined,
  expanded: false
};

SNavigationButton.propTypes = {
  className: string,
  onClick: func,
  expanded: bool
};

export default SNavigationButton;
