import React, { Fragment } from 'react';
import { bool, oneOf, string } from 'prop-types';
import classNames from 'classnames';
import loaderGif from '../../assets/gif/copper.gif';
import { STransition } from './transition';

const SLoader = ({ loading, fluid, full, className, children, type, dark }) => {
  const loader = (
    <div className={classNames('s-loader', { _fluid: fluid, _full: full, _dark: dark }, className)}>
      {type === 'infinity' && <img alt="" src={loaderGif} className="s-loader__image" />}
      {type === 'box' && (
        <div className="s-loader__box">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </div>
  );

  return (
    <>
      <STransition inProp={loading}>{loader}</STransition>
      {children}
    </>
  );
};

SLoader.defaultProps = {
  fluid: false,
  full: false,
  className: '',
  type: 'box',
  dark: false,
};

SLoader.propTypes = {
  loading: bool.isRequired,
  fluid: bool,
  className: string,
  full: bool,
  type: oneOf(['infinity', 'box']),
  dark: bool,
};

export default SLoader;
