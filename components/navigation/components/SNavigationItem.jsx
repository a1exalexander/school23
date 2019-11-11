import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

const SNavigationItem = ({ href = '/', className, children, label }) => {
  return (
    <li className={classNames('nav-item', className)}>
      <Link href={href}>
        <a className="nav-item__link">
          <div className="nav-item__icon-wrapper">{children}</div>
          <span className="nav-item__text">{label}</span>
        </a>
      </Link>
    </li>
  );
};

export default SNavigationItem;
