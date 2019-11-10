import React from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

const SNavigationButton = ({ className, onClick }) => {

  const { route } = useRouter();
  const isDark = ['/news'].includes(route);

  return (
    <div className={classNames('s-navigation-button', className, { dark: isDark })}>
      <button onClick={onClick} className='s-navigation-button__button'>
        <div className="s-navigation-button__dot"></div>
        <div className="s-navigation-button__dot"></div>
        <div className="s-navigation-button__dot"></div>
        <div className="s-navigation-button__dot"></div>
      </button>
    </div>
  )
}

export default SNavigationButton;
