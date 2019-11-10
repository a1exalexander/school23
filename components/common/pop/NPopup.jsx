import React from 'react';
import { NTransition, NButton } from 'components';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ReactComponent as IconClose } from 'assets/svg/close.svg';

const NPopup = props => {
  const {
    buttonsProps: {
      onSecondary = () => {},
      onPrimary = () => {},
      secondaryLabel = 'Cancel',
      primaryLabel = 'Enable',
    } = {},
    buttons = true,
    children,
    className,
    inProp,
    onClose,
    title = ''
  } = props;

  const buttonsContainer = (
    <div className="n-popup__buttons">
      <NButton onClick={onSecondary} type="secondary">
        {secondaryLabel}
      </NButton>
      <NButton onClick={onPrimary}>{primaryLabel}</NButton>
    </div>
  );

  return (
    <NTransition inProp={inProp}>
      <div className={classNames('n-popup', { withButons: buttons })}>
        <div className="n-popup__bg" onClick={onClose}></div>
        <div className="n-popup__wrapper">
          <div className="n-popup__card">
            <header className="n-popup__header">
              <h2 className="n-popup__title">{title}</h2>
              <button onClick={onClose} className="n-popup__close-button">
                <IconClose className="n-popup__close-icon" />
              </button>
            </header>
            <main className={classNames('n-popup__body', className)}>{children}</main>
            {buttons && buttonsContainer}
          </div>
        </div>
      </div>
    </NTransition>
  );
};

NPopup.propTypes = {
  title: PropTypes.string,
  inProp: PropTypes.bool,
  onClose: PropTypes.func,
  buttons: PropTypes.bool,
  buttonsProps: PropTypes.shape({
    onSecondary: PropTypes.func,
    onPrimary: PropTypes.func,
    primaryLabel: PropTypes.string,
    secondaryLabel: PropTypes.string
  })
};

export default NPopup;
