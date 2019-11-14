import React from 'react';
import classNames from 'classnames';

const SNavigationInfo = ({ className = ''  }) => {

  const colorType = 'class';

  return (
    <div className={classNames('nav-info', colorType, className)}>
      <span className='nav-info__time'>13:45</span>
      <span className='nav-info__text'>7 урок</span>
    </div>
  )
};

export default SNavigationInfo;
