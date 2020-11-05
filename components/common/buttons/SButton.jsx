import React from 'react';
import classNames from 'classnames';
import { bool, func, node, number, object, string } from 'prop-types';

export const SButton = (props) => {
  const {
    label,
    className,
    children,
    onClick,
    disabled = false,
    loading = false,
    type = 'primary',
    size = 'normal',
    fluid = false,
    revert = true,
    style,
    id = '',
    name = '',
  } = props;

  const withIcon = label && children;

  return (
    <button
      id={id}
      name={name}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={classNames('s-button', type, size, { loading, fluid }, className)}
    >
      {withIcon && revert ? children : null}
      <span
        className={classNames(
          's-button__text',
          { 'icon-right': withIcon && !revert },
          { 'icon-left': withIcon && revert }
        )}
      >
        {label || children}
      </span>
      {withIcon && !revert ? children : null}
      <svg className="s-button__loading" focusable="false" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="9"></circle>
      </svg>
    </button>
  );
};

SButton.propTypes = {
  label: string,
  className: string,
  type: string,
  onClick: func,
  size: string,
  loading: bool,
  disabled: bool,
  fluid: bool,
  revert: bool,
  link: bool,
  svgSize: number,
  style: object,
  name: string,
  id: string,
  children: node,
};

export default SButton;
