import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const SButton = props => {
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
    name = ''
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
  label: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  fluid: PropTypes.bool,
  revert: PropTypes.bool,
  link: PropTypes.bool,
  svgSize: PropTypes.number,
  style: PropTypes.object,
  name: PropTypes.string,
  id: PropTypes.string
};

export default SButton;
