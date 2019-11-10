import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { handleCheckboxChange, handleCheckboxKeyUp } from './handleChange';

const NSwitch = (props) => {

  const { name, className, value, checked = false, onChange } = props;
  
  const [checkState, setCheckState] = useState(checked);

  const handleKeyUp = handleCheckboxKeyUp({checkState, setCheckState, name, onChange, value});
  const handleChange = handleCheckboxChange({ setCheckState, name, onChange });

  return (
    <label onKeyUp={handleKeyUp} className={classNames("n-switch", className)} tabIndex='0'>
      <input
        onKeyUp={handleKeyUp}
        type="checkbox"
        name={name}
        checked={checkState}
        onChange={handleChange}
        className="n-switch__checkbox"
      />
      <span className="n-switch__slider"></span>
    </label>
  );
};

NSwitch.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

export default NSwitch;
