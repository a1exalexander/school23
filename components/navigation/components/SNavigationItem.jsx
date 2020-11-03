import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { func, string } from 'prop-types';

const SNavigationItem = ({ href, className, children, label }) => {
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

SNavigationItem.defaultProps = {
  href: '/',
  className: '',
  label: '',
};

SNavigationItem.propTypes = {
  href: string,
  className: string,
  label: string,
};

export default SNavigationItem;
