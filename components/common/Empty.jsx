import React from 'react';
import classNames from 'classnames';
import { IconBox } from './icons';
import { isBrowser } from '../../utils';

const Empty = ({ className = '', text = 'Дані відсутні' }) => {

  return (
      isBrowser() && <div className="empty">
      <IconBox className={classNames('empty__logo', className)}/>
      <p className='empty__text'>{text}</p>
    </div>
  )
};

export default Empty;
