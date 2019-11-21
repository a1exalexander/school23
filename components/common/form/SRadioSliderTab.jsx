import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SRadioSliderTab = ({
  checked,
  onChange,
  name,
  position = 'left',
  value,
  label,
  children,
}) => {
  const handleChange = e => {
    const { value } = e.target;
    onChange(value);
  };

  const handleKeyUp = e => {
    if (e.key === 'Enter') {
      onChange(value);
    }
  };

  const card = (
    <div className={classNames("s-radio-slider-tab__dropdown", position)}>
      <div className="s-radio-slider-tab__card">{children}</div>
    </div>
  );

  return (
    <div className={classNames("s-radio-slider-tab__wrapper", { active: checked })}>
      <label
        onKeyUp={handleKeyUp}
        className={classNames('s-radio-slider-tab', { active: checked })}
      >
        <input
          onChange={handleChange}
          checked={checked}
          value={value}
          name={name}
          className="s-radio-slider-tab__input"
          type="radio"
        />
        <span className="s-radio-slider-tab__link">
          <span className="s-radio-slider-tab__label">{label}</span>
        </span>
      </label>
    </div>
  );
};

SRadioSliderTab.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  checked: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  position: PropTypes.string,
};

export default SRadioSliderTab;
