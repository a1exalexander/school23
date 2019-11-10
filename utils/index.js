import filterSearch from './search';
import trancate from './truncate';

const $hasOwnProperty = Object.prototype.hasOwnProperty;

export const has = (obj, key) => {
  if (typeof obj !== 'object') return false;
  return $hasOwnProperty.call(obj, key);
}

export const isObject = (el) => typeof el === 'object';
export const isFunction = (el) => typeof el === 'function';
export const isString = (el) => typeof el === 'string';
export const isNumber = (el) => !Number.isNaN(el);
export const isNumberForce = (el) => !Number.isNaN(Number(el));

export const getErrorMessage = (error = 'Somthing Wrong') => {
  let msg = [isString(error), isObject(error)].includes(true) ? error : 'Something wrong';
  if (error instanceof Object) {
    switch (true) {
      case has(error, 'message'):
        msg = error.message;
        break;
      case has(error, 'msg'):
        msg = error.msg;
        break;
      case has(error, 'data'):
        msg = error.data;
        break;
      case has(error, 'response'):
        msg = error.response.statusText;
        break;
      default:
        break;
    }
  }
  return msg;
};

export { filterSearch, trancate };
