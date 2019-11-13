import React from 'react';
import classNames from 'classnames';

const SVideo = ({ videos, className }) => {
  return (
    <video className={classNames('s-video', className)} autoPlay loop muted>
      {videos.map((props, idx) => (
        <source {...props} key={idx} />
      ))}
      <img src="/images/23_bg.jpg" alt="" />
    </video>
  );
};

export default SVideo;
