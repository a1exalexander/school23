import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { ReactComponent as IconCheck } from "assets/svg/Mask.svg";
import { ReactComponent as IconInfo } from "assets/svg/information.svg";
import { ReactComponent as IconError } from "assets/svg/danger.svg";

const NNotification = props => {
  const { label, className, children, type = "success", onClick } = props;

  const notificationIcon = () => {
    switch (type) {
      default:
        return <div className="n-notification__icon-wrapper"><IconCheck className="n-notification__icon" /></div>;
      case "error":
        return (
          <IconError className="n-notification__icon n-notification__icon--error" />
        );
      case "info":
        return (
          <IconInfo className="n-notification__icon n-notification__icon--info" />
        );
    }
  };

  return (
    <div onClick={onClick} className={classNames("n-notification", type, className)}>
      {notificationIcon()}
      <span className="n-notification__text">{label || children}</span>
    </div>
  );
};

NNotification.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string
};

export default NNotification;
