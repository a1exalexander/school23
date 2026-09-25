import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { node, string } from 'prop-types';

export const SNavigationItem = ({ href, className, children, label }) => {
  const { route } = useRouter();
  // a post page (e.g. /news/[nid]) belongs to its section too
  const isActive = route === href || route.startsWith(`${href}/`);
  return (
    <li className={classNames('nav-item', className, { _active: isActive })}>
      <Link href={href}>
        <a className="nav-item__link" aria-current={isActive ? 'page' : undefined}>
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
  children: null
};

SNavigationItem.propTypes = {
  href: string,
  className: string,
  label: string,
  children: node
};

export default SNavigationItem;
