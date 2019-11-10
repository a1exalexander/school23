import React from 'react';
import classNames from 'classnames';

const SVideo = ({ videos, className }) => {
  return (
    <video className={classNames('s-video', className)} autoPlay loop muted>
      {videos.map((props, idx) => (
        <source {...props} key={idx} />
      ))}
      <img src="https://picsum.photos/1440/960" alt="" />
    </video>
  );
};

export default SVideo;
