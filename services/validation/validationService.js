import validator from 'validator';
import validations from './validations';
import messages from './messages';

const vTypes = {
  email: (type) => ['isEmail', 'email'].includes(type),
  password: (type) => ['pass', 'password'].includes(type),
  required: (type) => ['require', 'required'].includes(type),
  equals: (type) => ['equals','equal', 'same'].includes(type),
};

const initState = {
  isBlur: false,
  type: '',
  value: '',
  isActive: false,
  isEmpty: true,
  isValid: true,
  isInvalid: false,
  required: false,
  message: '',
  anyError: false,
};

const setValidatiorType = (type) => {
  switch (true) {
    case vTypes.email(type):
      return { type: 'isEmail' };
    case vTypes.required(type):
      return { type: 'required', required: true };
    case vTypes.password(type):
      return { type: 'password' };
    case vTypes.equals(type):
      return { type: 'equals' };
    default:
      return {};
  }
}

const getMessage = ({ type, value, required }, isEmpty, isInvalid) => {
  const msgs = messages[type] || messages.defaultMessages;
  if (isEmpty && required) return msgs.required;
  if (isInvalid) {
    switch (type) {
      case 'password':
        if (!validations.lowerCase(value)) return msgs.lowerCase;
        if (!validations.upperCase(value)) return msgs.upperCase;
        if (!validations.specialChars(value)) return msgs.specialChars;
        if (!validations.oneNumber(value)) return msgs.oneNumber;
        if (!validations.minAmount(value)) return msgs.minAmount;
        break;
      default:
        break;
    }
    return msgs.valid;
  };
  return '';
}

const anyError = (required, isEmpty, isValid, isBlur) => {
  if (!isBlur) return false;
  if (required) {
    return [isEmpty, !isValid].includes(true);
  }
  return !isValid && !isEmpty;
}

export const fastValidate = (type, value, extra) => {
  switch (true) {
    case vTypes.email(type):
      return validator.isEmail(value);
    case vTypes.required(type):
      return !!String(value).length;
    case vTypes.password(type):
      return validations.password(value);
    case vTypes.equals(type):
      return validator.equals(value, extra);
    default:
      return true;
  }
}

const validationService = {

  initState,

  init: (type, required) => {
    const validator = required && !type ? 'required' : type;
    return {
      ...initState,
      required,
      isActive: !validator,
      ...setValidatiorType(validator),
    }
  },

  validate: (prevState = initState, { value = '', isBlur, extra }) => {
    const { type, required = false } = prevState;
    const state = {...prevState};
    if (type) {
      const $isValid = fastValidate(type, value, extra);
      const $isEmpty = !String(value).length;
      state['isValid'] = $isValid;
      state['isInvalid'] = !$isValid;
      state['message'] = getMessage({...prevState, value}, $isEmpty, !$isValid);
      state['isBlur'] = isBlur;
      state['isEmpty'] = $isEmpty;
      state['anyError'] = anyError(required, $isEmpty, $isValid, isBlur);
    }
    return state;
  },
}

export default validationService;
