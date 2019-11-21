import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { handleCheckboxChange, handleCheckboxKeyUp } from './handleChange';
import { IconCheck } from "../icons";

const NCheckbox = props => {
  const { name, label, className, children, value, checked = false, onChange } = props;

  const [checkState, setCheckState] = useState(checked);

  const handleKeyUp = handleCheckboxKeyUp({checkState, setCheckState, name, onChange, value});
  const handleChange = handleCheckboxChange({ setCheckState, name, onChange });

  return (
    <label onKeyUp={handleKeyUp} className={classNames("s-checkbox", className)} tabIndex="0">
      <input
        name={name}
        onChange={handleChange}
        value={value}
        checked={checkState}
        type="checkbox"
        className="s-checkbox__input"
      />
      <div className="s-checkbox__inner">
        <div className="s-checkbox__cell">
          <IconCheck className="s-checkbox__image" />
        </div>
        <div>
          <span className="s-checkbox__text">{label || children}</span>
        </div>
      </div>
    </label>
  );
};

NCheckbox.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

export default NCheckbox;
