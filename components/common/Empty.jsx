import React from 'react';
import classNames from 'classnames';
import { node, string } from 'prop-types';
import { IconBox } from './icons';
import { isBrowser } from '../../utils';

export const Empty = ({ className, text, hint, children }) => {
  return (
    isBrowser() && (
      <div className={classNames('empty', className)}>
        <IconBox className="empty__logo" />
        <p className="empty__text">{text}</p>
        {hint && <p className="empty__hint">{hint}</p>}
        {children && <div className="empty__action">{children}</div>}
      </div>
    )
  );
};

Empty.defaultProps = {
  className: '',
  text: 'Дані відсутні',
  hint: undefined,
  children: undefined
};

Empty.propTypes = {
  className: string,
  text: string,
  hint: string,
  children: node
};

export default Empty;
