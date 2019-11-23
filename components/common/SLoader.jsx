import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { STransitionSwitch } from '../index';
import loaderGif from '../../assets/gif/copper.gif';

const SLoader = ({ loading, fluid = false, className, children }) => {

  const loader = (
    <div className={classNames('s-loader', { fluid }, className)}>
      <img alt="" src={loaderGif} className="s-loader__image" />
    </div>
  );

  if (!children) {
    return loading && loader;
  }

  return <Fragment><STransitionSwitch keyProp={loading}>{loading ? loader : children}</STransitionSwitch></Fragment>;
};

SLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  fluid: PropTypes.bool,
  className: PropTypes.string
};

export default SLoader;
