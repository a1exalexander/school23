import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { messages } from '../../constants';

const NNotification = props => {
  const { message, className = '', children, type = "success", onClick } = props;

  const getMessage = () => {
    switch (type) {
      case 'error':
        return children || message || messages.ERROR_MESSAGE;
      case 'info':
        return children || message || messages.INFO_MESSAGE;
      default:
        return children || message || messages.SUCCESS_MESSAGE;
    }
  }

  const notificationIcon = () => {
    switch (type) {
      default:
        return <span className='s-notification__icon' role="img" area-label='success'>🚀</span>;
      case "error":
        return <span className='s-notification__icon' role="img" area-label='error'>🔥</span>
      case "info":
        return <span className='s-notification__icon' role="img" area-label='info'>⚡</span>
    }
  };

  return (
    <div onClick={onClick} className={classNames("s-notification", type, className)}>
      {notificationIcon()}
      <span className="s-notification__text">{ getMessage() }</span>
    </div>
  );
};

NNotification.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error', 'info']),
};

export default NNotification;
