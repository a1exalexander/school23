import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const NBadge = props => {
  const { label, className, children, color = 'green' } = props;

  const withIcon = label && children;

  return (
    <div className={classNames('n-badge', color, className)}>
      {withIcon ? children : null}
      <span className={classNames('n-badge__text', { 'icon-left': withIcon })}>
        {label || children}
      </span>
    </div>
  );
};

NBadge.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  optionalEnum: PropTypes.oneOf(['blue', 'green', 'cyan', 'red', 'yellow'])
};

export default NBadge;
