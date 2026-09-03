import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { messages } from '../../constants';

const SNotification = (props) => {
  const { message, className = '', children, type = 'success', onClick } = props;

  const getMessage = () => {
    switch (type) {
      case 'error':
        return children || message || messages.ERROR_MESSAGE;
      case 'info':
        return children || message || messages.INFO_MESSAGE;
      default:
        return children || message || messages.SUCCESS_MESSAGE;
    }
  };

  const notificationIcon = () => {
    switch (type) {
      default:
        return (
          <span className="s-notification__icon" role="img" aria-label="success">
            🚀
          </span>
        );
      case 'error':
        return (
          <span className="s-notification__icon" role="img" aria-label="error">
            ⚠️
          </span>
        );
      case 'info':
        return (
          <span className="s-notification__icon" role="img" aria-label="info">
            ⚡
          </span>
        );
    }
  };

  return (
    <div
      onClick={onClick}
      role={type === 'error' ? 'alert' : 'status'}
      className={classNames('s-notification', type, className)}
    >
      {notificationIcon()}
      <span className="s-notification__text">{getMessage()}</span>
      <button
        type="button"
        className="s-notification__close"
        aria-label="Закрити повідомлення"
        title="Закрити"
        onClick={onClick}
      >
        ✕
      </button>
    </div>
  );
};

SNotification.defaultProps = {
  message: '',
  className: '',
  children: null,
  type: 'success',
  onClick: () => undefined
};

SNotification.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.oneOf(['success', 'error', 'info']),
  onClick: PropTypes.func
};

export default SNotification;
