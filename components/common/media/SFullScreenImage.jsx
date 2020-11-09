import React from 'react';
import { func, string } from 'prop-types';
import { IconClose } from '../icons';
import { STransition } from '../transition';

export const SFullScreenImage = ({ src, alt, onClose }) => {
  return (
    <STransition inProp={!!src}>
      <div className="SFullScreenImage">
        <button onClick={onClose} type="button" className="SFullScreenImage__btn">
          <IconClose className="SFullScreenImage__icon" />
        </button>
        <img src={src} alt={alt} className="SFullScreenImage__image" />
      </div>
    </STransition>
  );
};

SFullScreenImage.defaultProps = {
  src: undefined,
  alt: undefined,
  onClose: () => undefined
};

SFullScreenImage.propTypes = {
  src: string,
  alt: string,
  onClose: func
};

export default SFullScreenImage;
