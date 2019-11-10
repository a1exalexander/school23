import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const NPopover = props => {
  const {
    className,
    children,
    target,
    top = "0px",
    bottom = "auto",
    right = "auto",
    left = "0px",
    rotate = false,
  } = props;

  const [isOver, setOver] = useState(false);

  return (
    <div className={classNames("n-popover", className)} onMouseEnter={() => setOver(true)} onMouseLeave={() => setOver(false)}>
      <div className={classNames('n-popover__target', { rotate: isOver && rotate })}>{target()}</div>
      <div
        style={{
          top: `calc(-${bottom} - 10px)`,
          left: `calc(-${right} - 10px)`,
          right: `calc(-${left} - 10px)`,
          bottom: `calc(-${top} - 10px)`
        }}
        className="n-popover__hover"
      ></div>
      <div style={{ paddingTop: top, left, right, bottom }} className="n-popover__layer">
        <div className="n-popover__card">{children}</div>
      </div>
    </div>
  );
};

NPopover.propTypes = {
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  right: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  target: PropTypes.func,
  className: PropTypes.string,
  rotate: PropTypes.bool,
};

export default NPopover;
