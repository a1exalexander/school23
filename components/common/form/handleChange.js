import { isFunction } from '../../../utils';

export const handleChangeMultiCheckbox = (setState) => ({ value }) => {
  setState((prevState) => {
    const shallowCopy = [...prevState];
    if (shallowCopy.some(el => el === value)) {
      const idx = shallowCopy.findIndex(el => el === value);
      shallowCopy.splice(idx, 1);
    } else {
      shallowCopy.push(value)
    }
    return [...shallowCopy];
  })
}

export const handleCheckboxKeyUp = ({checkState, setCheckState, name, onChange, value}) => e => {
    
  if (e.key === "Enter") {
    const inputs = document.getElementsByName(name);
    const checked = !checkState;
    setCheckState(checked);
    if (isFunction(onChange)) {
      if (inputs.length > 1 ) {
        onChange({ value, checked })
      } else onChange(checked);
    } 
  }
};

export const handleCheckboxChange = ({ setCheckState, name, onChange }) => e => {
  const inputs = document.getElementsByName(name);
  const { value, checked } = e.target;
  setCheckState(checked);
  if (isFunction(onChange)) {
    if (inputs.length > 1 ) onChange({ value, checked });
    else onChange(checked);
  } 
}

export const handleChange = (onChange) => (e) => {
  const { value } = e.target;
  onChange(value);
}

export default { handleChangeMultiCheckbox, handleCheckboxChange, handleCheckboxKeyUp };
