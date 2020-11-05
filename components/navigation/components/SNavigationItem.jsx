import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { node, string } from 'prop-types';

export const SNavigationItem = ({ href, className, children, label }) => {
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
  children: node
};

export default SNavigationItem;
