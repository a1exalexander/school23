/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { validationService } from '../../../services';
import { IconEye, IconHide } from '../icons';
import { isNumberForce } from '../../../utils';

const NInput = (props) => {
  const {
    label,
    placeholder,
    autoComplete,
    className,
    children,
    value,
    onChange,
    type: inputType = 'text',
    validator,
    required = false,
    extra = '',
    maxLength = 524288,
    readOnly = false
  } = props;

  const [isBlur, setBlur] = useState(false);
  const [charsVisibility, setCharsVisibility] = useState(false);
  const [validation, updateValidation] = useState({ ...validationService.initState });

  useEffect(() => {
    updateValidation({ ...validationService.init(validator, required) });
  }, [validator, required]);

  useEffect(() => {
    updateValidation((prevState) => ({
      ...validationService.validate(prevState, { value, isBlur, extra })
    }));
  }, [value, isBlur, extra]);

  const isNumberType = inputType === 'number' ? 'text' : inputType;
  const type = isNumberType === 'password' && charsVisibility ? 'text' : isNumberType;
  const hasLabel = label || children;

  const handleChange = (e) => {
    const { value: val } = e.target;
    if (inputType !== 'number' || isNumberForce(val)) {
      onChange(val);
    }
  };

  const togglePassword = () => {
    if (inputType === 'password') {
      return (
        <button
          type="button"
          className="s-input__button"
          onClick={() => setCharsVisibility(!charsVisibility)}
        >
          {charsVisibility ? <IconHide /> : <IconEye />}
        </button>
      );
    }
    return null;
  };

  const labelComponent = () => {
    if (hasLabel) return <span className="s-input__label">{label || children}</span>;
    return null;
  };

  const errorComponent = () => {
    if (validation.anyError)
      return <span className="s-input__error animated bounceIn">{validation.message}</span>;
    return null;
  };

  const inputProps = {
    onBlur: () => setBlur(true),
    value,
    autoComplete: autoComplete === 'off' ? 'new-password' : autoComplete,
    placeholder,
    required,
    onChange: handleChange,
    type,
    readOnly,
    maxLength,
    className: classNames('s-input__input', {
      error: validation.anyError
    })
  };

  return (
    <label className={classNames('s-input', inputType, className)}>
      {labelComponent()}
      <div className="s-input__inner">
        <input {...inputProps} />
        {togglePassword()}
      </div>
      {errorComponent()}
    </label>
  );
};

NInput.defaultProps = {
  label: undefined,
  className: undefined,
  value: undefined,
  handleChange: () => undefined,
  validator: undefined,
  required: false,
  placeholder: undefined,
  autoComplete: 'off',
  extra: undefined,
  maxLength: undefined,
  readOnly: false,
  children: undefined,
  onChange: () => undefined,
  type: undefined
};

NInput.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func,
  validator: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  extra: PropTypes.string,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  readOnly: PropTypes.bool,
  children: PropTypes.node,
  onChange: PropTypes.func,
  type: PropTypes.string
};

export default NInput;
