import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const SRadio = props => {

  const { name, label, className, value, children, onChange, checked } = props;

  const handleChange = (e) => {
    const { value } = e.target;
    onChange(value);
  }

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      onChange(value);
    }
  }

  return (
    <label onKeyUp={handleKeyUp} className={classNames("s-radio", className)} tabIndex="0">
      <input
        name={name}
        value={value}
        type="radio"
        checked={value === checked}
        onChange={handleChange}
        className="s-radio__input"
      />
      <span className="s-radio__button">
        <span className="s-radio__dot-wrapper">
          <span className="s-radio__dot animated fast delay-02s bounceIn"></span>
        </span>
          <span className='s-radio__text'>{ label || children }</span>
      </span>
    </label>
  );
};

SRadio.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]).isRequired,
  onChange: PropTypes.func,
  checked: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]).isRequired,
  name: PropTypes.string.isRequired,
};

export default SRadio;
