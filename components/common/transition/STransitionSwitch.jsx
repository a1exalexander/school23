import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import transitionClasses from './transitionClasses';

const STransitionSwitch = ({ appear, keyProp, timeout, mode, children, name }) => {
  return (
    <SwitchTransition mode={mode}>
      <CSSTransition
        appear={appear}
        timeout={Number(timeout)}
        classNames={transitionClasses[name]}
        key={String(keyProp)}
        unmountOnExit
      >
        {children}
      </CSSTransition>
    </SwitchTransition>
  );
};

STransitionSwitch.defaultProps = {
  name: 'fade',
  mode: 'out-in',
  appear: true,
  timeout: 200,
  children: undefined
};

STransitionSwitch.propTypes = {
  name: PropTypes.string,
  mode: PropTypes.string,
  keyProp: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  appear: PropTypes.bool,
  timeout: PropTypes.number,
  children: PropTypes.node
};

export default STransitionSwitch;
