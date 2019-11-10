import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ReactComponent as IconTriangle } from 'assets/svg/triangle.svg';
import { ReactComponent as IconSearch } from 'assets/svg/search.svg';
import { handleChange } from './handleChange';
import { filterSearch, isObject } from 'utils';

const NSelect = ({ className, list, value, onChange, withSearch = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const onSelect = value => (e) => {
    onChange(value);
    setIsOpen(false);
  };

  const getLabel = value => {
    const finded = list.find(el => {
      if (isObject(el)) {
        return el.value === value
      } else {
        return el === value;
      }
    }) || {};
    return isObject(finded) ? finded.label : finded;
  };

  const filteredList = list.filter(filterSearch(search))

  const originOptions = list.map((el, idx) => {
    if (isObject(el)) {
      return (
        <option value={el.value} key={el.id || idx}>
          {el.label}
        </option>
      );
    }
    return (
      <option key={idx} value={el}>
        {el}
      </option>
    );
  });

  const customOptions = filteredList.map((el, idx) => {
    if (isObject(el)) {
      return (
        <li
          onClickCapture={onSelect(el.value)}
          className={classNames('n-select__option', {
            active: el.value === value
          })}
          key={el.id || idx}
        >
          {el.label}
        </li>
      );
    }
    return (
      <li
        onClickCapture={onSelect(el)}
        className={classNames('n-select__option', {
          active: el === value
        })}
        key={idx}
      >
        {el}
      </li>
    );
  });

  const searchSection = (<div className="n-select__search">
    <input value={search} onChange={handleChange(setSearch)} type="text" className="n-select__search-input"/>
    <IconSearch className="n-select__search-icon"/>
  </div>)

  const dropdown = () => {
    if (isOpen) {
      return (
        <div className="n-select__dropdown">
          { withSearch ? searchSection : null }
          <ul className="n-select__list">{customOptions}</ul>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={classNames('n-select', className)}>
      <div className="n-select__wrapper n-select__wrapper--mobile">
        <select
          value={value}
          onChange={handleChange(onChange)}
          className="n-select__origin-select"
        >
          {originOptions}
        </select>
      </div>
      <div className="n-select__wrapper n-select__wrapper--desktop">
        <input
          onClick={() => setIsOpen(true)}
          type="text"
          readOnly
          className={classNames('n-select__placeholder', { 'active': isOpen })}
          value={getLabel(value)}
        />
        {isOpen ? (
          <div onClick={() => setIsOpen(false)} className="layer"></div>
        ) : null}
        <div className="n-select__icon-wrapper">
          <IconTriangle
            className={classNames('n-select__icon', { active: isOpen })}
          />
        </div>
        {dropdown()}
      </div>
    </div>
  );
};

NSelect.propTypes = {
  className: PropTypes.string,
  list: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  withSearch: PropTypes.bool,
};

export default NSelect;
