import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { arrayOf, oneOf, oneOfType, shape, string } from 'prop-types';
import { IconArrowLeft } from '../icons';
import { SFullScreenImage } from './SFullScreenImage';

const SWIPE_THRESHOLD = 40;

const normalize = (images) =>
  (Array.isArray(images) ? images : [])
    .map((image, idx) => {
      if (!image) return null;
      if (typeof image === 'string') return { id: String(idx), src: image, title: '' };
      if (!image.src) return null;
      return { id: image.id || String(idx), src: image.src, title: image.title || '' };
    })
    .filter(Boolean);

/**
 * Lightweight image gallery: one big picture, arrows, counter, thumbnails,
 * swipe and keyboard navigation, click to open the full-screen viewer.
 */
export const SGallery = ({ images, className, alt, aspect, thumbs }) => {
  const slides = normalize(images);
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const [fullImage, setFullImage] = useState(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (index > count - 1) setIndex(0);
  }, [count, index]);

  const go = useCallback(
    (delta) => {
      if (count < 2) return;
      setIndex((current) => (current + delta + count) % count);
    },
    [count]
  );

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    }
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1);
  };

  if (!count) return null;

  return (
    <div
      className={classNames('s-gallery', `_${aspect}`, className)}
      role="group"
      aria-roledescription="галерея"
      aria-label={alt}
    >
      <SFullScreenImage src={fullImage} alt={alt} onClose={() => setFullImage(null)} />
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className="s-gallery__stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyDown={onKeyDown}
      >
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            className={classNames('s-gallery__view', { _active: idx === index })}
            onClick={() => setFullImage(slide.src)}
            tabIndex={idx === index ? 0 : -1}
            aria-hidden={idx !== index}
            aria-label="Відкрити фото на весь екран"
          >
            <img
              src={slide.src}
              alt={slide.title || alt}
              className="s-gallery__image"
              loading={idx === 0 ? 'eager' : 'lazy'}
              draggable="false"
            />
          </button>
        ))}
        {count > 1 && (
          <>
            <button
              type="button"
              className="s-gallery__arrow _prev"
              onClick={() => go(-1)}
              aria-label="Попереднє фото"
            >
              <IconArrowLeft />
            </button>
            <button
              type="button"
              className="s-gallery__arrow _next"
              onClick={() => go(1)}
              aria-label="Наступне фото"
            >
              <IconArrowLeft />
            </button>
            <span className="s-gallery__counter" aria-live="polite">
              {`${index + 1} / ${count}`}
            </span>
          </>
        )}
      </div>
      {thumbs && count > 1 && (
        <div className="s-gallery__thumbs">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={classNames('s-gallery__thumb', { _active: idx === index })}
              onClick={() => setIndex(idx)}
              aria-label={`Фото ${idx + 1} з ${count}`}
              aria-pressed={idx === index}
            >
              <img src={slide.src} alt="" loading="lazy" draggable="false" />
            </button>
          ))}
        </div>
      )}
      {!thumbs && count > 1 && (
        <div className="s-gallery__dots">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={classNames('s-gallery__dot', { _active: idx === index })}
              onClick={() => setIndex(idx)}
              aria-label={`Фото ${idx + 1} з ${count}`}
              aria-pressed={idx === index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

SGallery.defaultProps = {
  images: undefined,
  className: undefined,
  alt: 'Фото',
  aspect: 'wide',
  thumbs: true
};

SGallery.propTypes = {
  images: arrayOf(oneOfType([string, shape({ id: string, title: string, src: string })])),
  className: string,
  alt: string,
  aspect: oneOf(['wide', 'square', 'portrait']),
  thumbs: oneOfType([shape({}), string, oneOf([true, false])])
};

export default SGallery;
