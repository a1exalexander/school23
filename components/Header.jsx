import { node, string } from 'prop-types';
import classNames from 'classnames';
import React from 'react';

export const Header = ({ className, children, title, description }) => {
  return (
    <header className={classNames('Header', className)}>
      <div className="Header__heading">
        <h1 className="Header__title">{title}</h1>
        {description && <p className="Header__description">{description}</p>}
      </div>
      {children && <div className="Header__actions">{children}</div>}
    </header>
  );
};

Header.defaultProps = {
  className: '',
  children: undefined,
  description: undefined
};

Header.propTypes = {
  className: string,
  children: node,
  title: string.isRequired,
  description: string
};

export default Header;
