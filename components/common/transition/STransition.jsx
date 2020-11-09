import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import transitionClasses from './transitionClasses';

const STransition = ({ appear, inProp, children, timeout, name }) => {
  return (
    <CSSTransition
      in={inProp}
      appear={appear}
      timeout={timeout}
      classNames={transitionClasses[name]}
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

STransition.defaultProps = {
  name: 'fade',
  children: undefined,
  timeout: 400,
  appear: true
};

STransition.propTypes = {
  inProp: PropTypes.bool.isRequired,
  children: PropTypes.node,
  name: PropTypes.string,
  appear: PropTypes.bool,
  timeout: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
};

export default STransition;
