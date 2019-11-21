import React from 'react';
import PropTypes from 'prop-types';
import { IconClose } from '../../../components/common/icons';
import { STransition, SButton } from '../../../components';

const LawPopup = ({ inProp, id, onClose }) => {

  return (
    <STransition inProp={inProp}>
      <div className='law-popup'>
        <div className="law-popup__bg animated slower fadeIn" onClick={onClose}></div>
        <div className="law-popup__wrapper">
          <div className="law-popup__card">
              <button onClick={onClose} className="law-popup__close-button">
                <IconClose className="law-popup__close-icon" />
              </button>
            <main className='law-popup__body'>
              <div className="law-popup__description">

              </div>
            </main>
            <div className="law-popup__bottom-btn">
              <SButton onClick={onClose} size="big" fluid type="secondary">
                Повернутися назад
              </SButton>
            </div>
          </div>
        </div>
      </div>
    </STransition>
  )
};

LawPopup.propTypes = {
  inProp: PropTypes.bool,
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])
}

export default LawPopup;
