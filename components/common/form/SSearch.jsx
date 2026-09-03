/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames';
import { func, string } from 'prop-types';
import { IconSearch, IconClose } from '../icons';

export const SSearch = ({ value, onChange, placeholder, className }) => {
  return (
    <label className={classNames('s-search', className)}>
      <IconSearch className="s-search__icon" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="s-search__input"
        placeholder={placeholder}
        aria-label={placeholder}
        type="search"
        autoComplete="off"
      />
      {value ? (
        <button
          type="button"
          className="s-search__clear"
          onClick={() => onChange('')}
          aria-label="Очистити пошук"
        >
          <IconClose />
        </button>
      ) : null}
    </label>
  );
};

SSearch.defaultProps = {
  value: '',
  onChange: () => undefined,
  placeholder: 'Пошук...',
  className: undefined
};

SSearch.propTypes = {
  value: string,
  onChange: func,
  placeholder: string,
  className: string
};

export default SSearch;
