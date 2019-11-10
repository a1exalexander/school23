import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from "prop-types";
import transitionClasses from './transitionClasses';

const NTransition = ({ appear = true, inProp, children, timeout = 200, name = 'fade' }) => {

  return (
    <CSSTransition
      in={inProp}
      appear={appear}
      timeout={timeout}
      classNames={transitionClasses[name]}
      unmountOnExit
    >
      { children }
    </CSSTransition>
  );
};

NTransition.propTypes = {
  inProp: PropTypes.bool.isRequired,
  name: PropTypes.string,
  appear: PropTypes.bool,
  timeout: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
}

export default NTransition;
