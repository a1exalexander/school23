import { node, string } from 'prop-types';
import classNames from 'classnames';
import React from 'react';

export const Header = ({ className, children, title }) => {
  return (
    <header className={classNames('Header', className)}>
      <h1 className="Header__title">{title}</h1>
      {children}
    </header>
  );
};

Header.defaultProps = {
  className: '',
  children: undefined
};

Header.propTypes = {
  className: string,
  children: node,
  title: string.isRequired
};

export default Header;
