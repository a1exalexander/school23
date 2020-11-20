import { isString } from '../../utils';

export default () => (next) => (action) => {
  if (isString(action)) {
    return next({
      type: action
    });
  }
  if (Array.isArray(action)) {
    const [type, payload] = action;
    return next({
      type,
      payload
    });
  }

  return next(action);
};
