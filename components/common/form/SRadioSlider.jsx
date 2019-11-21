import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SRadioSliderTab from './SRadioSliderTab';

const SRadioSlider = ({ tabs = [], name, onChange, fluid = false, checked, className = '' }) => {
  const [state, setState] = useState({ left: 0, width: 0 });

  const setActiveTab = () => {
    if (process.browser) {
      const selectedElement = document.querySelector('div.s-radio-slider-tab__wrapper.active');
      if (selectedElement) {
        setState(prevState => ({
          ...prevState,
          left: selectedElement.offsetLeft,
          width: selectedElement.getBoundingClientRect().width
        }));
      }
    }
  };

  useEffect(() => {
    setActiveTab();
  }, []);

  useEffect(() => {
    setActiveTab();
  }, [checked]);

  return (
    <div className={classNames('s-radio-slider', className, { fluid })}>
      <div
        className="s-radio-slider__badge"
        style={{ left: `${state.left}px`, maxWidth: `${state.width}px` }}
      ></div>
      {tabs.map((el, idx) => (
        <SRadioSliderTab
          name={name}
          value={el}
          checked={String(checked) === String(el)}
          onChange={onChange}
          key={String(idx)}
          label={el}
        />
      ))}
    </div>
  );
};

SRadioSlider.propTypes = {
  tabs: PropTypes.array,
  checked: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default SRadioSlider;
