import React from 'react';
import classNames from 'classnames';
import PropTypes, { node } from 'prop-types';

const SBadge = (props) => {
  const { label, className, children, color, size } = props;

  const withIcon = label && children;

  return (
    <div className={classNames('s-badge', size, color, className)}>
      {withIcon ? children : null}
      <span className={classNames('s-badge__text', { 'icon-left': withIcon })}>
        {label || children}
      </span>
    </div>
  );
};

SBadge.defaultProps = {
  label: undefined,
  className: undefined,
  color: 'green',
  children: undefined,
  size: 'small'
};

SBadge.propTypes = {
  children: node,
  label: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.oneOf(['blue', 'green', 'cyan', 'red', 'yellow']),
  size: PropTypes.oneOf(['small', 'large'])
};

export default SBadge;
