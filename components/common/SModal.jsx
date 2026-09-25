/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { bool, func, node, string } from 'prop-types';
import { STransition } from './transition';
import IconClose from './icons/IconClose';

/**
 * A simple dialog on top of the page: closes on the ✕ button, a click outside and Esc.
 */
export const SModal = ({ open, onClose, title, children, className, wide }) => {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  return (
    <STransition inProp={open}>
      <div className={classNames('s-modal', className)} role="dialog" aria-modal="true">
        <div className="s-modal__bg" onClick={onClose} />
        <div className={classNames('s-modal__card', { _wide: wide })}>
          <header className="s-modal__header">
            <h2 className="s-modal__title">{title}</h2>
            <button type="button" className="s-modal__close" onClick={onClose} aria-label="Закрити">
              <IconClose />
            </button>
          </header>
          <div className="s-modal__body">{children}</div>
        </div>
      </div>
    </STransition>
  );
};

SModal.defaultProps = {
  open: false,
  onClose: () => undefined,
  title: '',
  children: null,
  className: undefined,
  wide: false
};

SModal.propTypes = {
  open: bool,
  onClose: func,
  title: string,
  children: node,
  className: string,
  wide: bool
};

export default SModal;
