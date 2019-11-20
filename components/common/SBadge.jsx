import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const SBadge = props => {
  const { label, className, children, color = 'green' } = props;

  const withIcon = label && children;

  return (
    <div className={classNames('s-badge', color, className)}>
      {withIcon ? children : null}
      <span className={classNames('s-badge__text', { 'icon-left': withIcon })}>
        {label || children}
      </span>
    </div>
  );
};

SBadge.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.oneOf(['blue', 'green', 'cyan', 'red', 'yellow'])
};

export default SBadge;
