import React from 'react';
import classNames from 'classnames';
import { objectOf, bool, func, node, number, object, oneOfType, string } from 'prop-types';

export const SButton = (props) => {
  const {
    label,
    className,
    children,
    onClick,
    disabled,
    loading,
    type,
    size,
    fluid,
    revert,
    style,
    id,
    name
  } = props;

  const withIcon = label && children;

  return (
    <button
      type="button"
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
        <circle cx="10" cy="10" r="9" />
      </svg>
    </button>
  );
};

SButton.defaultProps = {
  label: undefined,
  className: undefined,
  type: 'primary',
  onClick: undefined,
  size: 'normal',
  loading: false,
  disabled: false,
  fluid: false,
  revert: true,
  style: undefined,
  name: undefined,
  id: undefined,
  children: undefined
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
  style: objectOf(oneOfType([object, string, number])),
  name: string,
  id: string,
  children: node
};

export default SButton;
