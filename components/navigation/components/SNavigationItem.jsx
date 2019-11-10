import React from 'react';
import classNames from 'classnames';

const SNavigationItem = ({ className, children, label }) => {
  return (
    <li className={classNames('nav-item', className)}>
      <a href="#" className="nav-item__link">
        <div className="nav-item__icon-wrapper">{children}</div>
        <span className="nav-item__text">{label}</span>
      </a>
    </li>
  );
};

export default SNavigationItem;
