import React, { Fragment } from 'react';
import PropTypes, { bool, string } from 'prop-types';
import classNames from 'classnames';
import { STransitionSwitch } from '../index';
import loaderGif from '../../assets/gif/copper.gif';

const SLoader = ({ loading, fluid, full, className, children }) => {
  const loader = (
    <div className={classNames('s-loader', { _fluid: fluid, _full: full }, className)}>
      <img alt="" src={loaderGif} className="s-loader__image" />
    </div>
  );

  if (!children) {
    return loading && loader;
  }

  return loading ? loader : children;
};

SLoader.defaultProps = {
  fluid: false,
  full: false,
  className: '',
};

SLoader.propTypes = {
  loading: bool.isRequired,
  fluid: bool,
  className: string,
  full: bool,
};

export default SLoader;
