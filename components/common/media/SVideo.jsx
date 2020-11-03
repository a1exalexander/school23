import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  array,
  arrayOf,
  bool,
  number,
  object,
  objectOf,
  oneOfType,
  shape,
  string,
} from 'prop-types';

const SVideo = ({ videos, className }) => {
  useEffect(() => {});
  return (
    <video className={classNames('s-video', className)} autoPlay loop muted preload="auto">
      {videos.map((props, idx) => (
        <source {...props} key={idx} />
      ))}
      <img src="/images/23_bg.jpg" alt="" />
    </video>
  );
};

SVideo.defaultProps = {
  videos: [],
  className: '',
};

SVideo.propTypes = {
  videos: arrayOf(
    shape({
      props: objectOf(oneOfType([string, number, object, array, bool])),
      idx: oneOfType([string, number]),
    })
  ),
  className: string,
};

export default SVideo;
