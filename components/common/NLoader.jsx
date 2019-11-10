import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import loaderGif from 'assets/loader.gif';

const NLoader = ({ loading, fluid = false, className, children }) => {

  const loader = (
    <div className={classNames('n-loader', { fluid }, className)}>
      <img alt="" src={loaderGif} className="n-loader__image" />
    </div>
  );

  if (!children) {
    return loading ? loader : null;
  }

  return <Fragment>{loading ? loader : children}</Fragment>;
};

NLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  fluid: PropTypes.bool,
  className: PropTypes.string
};

export default NLoader;
