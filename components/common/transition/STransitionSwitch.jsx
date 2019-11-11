import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import PropTypes from "prop-types";
import transitionClasses from './transitionClasses';

const STransitionSwitch = ({ appear = true, keyProp, timeout = 200, mode = 'out-in', children, name = 'fade' }) => {

  return (
    <SwitchTransition mode={mode}>
      <CSSTransition
        appear={appear}
        timeout={Number(timeout)}
        classNames={transitionClasses[name]}
        key={String(keyProp)}
        unmountOnExit
      >
      { children }
    </CSSTransition>
    </SwitchTransition>
  );
};

STransitionSwitch.propTypes = {
  name: PropTypes.string,
  mode: PropTypes.string,
  keyProp: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  appear: PropTypes.bool,
  timeout: PropTypes.number,
}

export default STransitionSwitch;
