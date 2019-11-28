import * as Logger from 'logplease';
import { getErrorMessage } from '../utils';

const ENV_MODE = process.env.NODE_ENV === 'development';

const onLogger = (name, msg, type) => {
  if (!ENV_MODE && !process.browser) return;
  const newLogger = Logger.create(name);
  newLogger[type](msg);
};

export default {
  debug: (msg = '', name = '') => {
    onLogger(name, msg, 'debug');
  },
  info: (msg = '', name = '') => {
    onLogger(name, msg, 'info');
  },
  error: (error = 'Something wrong!', name = '') => {
    onLogger(name, getErrorMessage(error), 'error');
  },
  warn: (msg = '', name = '') => {
    onLogger(name, msg, 'warn');
  },
  log: (msg = '', name = '') => {
    onLogger(name, msg, 'log');
  }
};
