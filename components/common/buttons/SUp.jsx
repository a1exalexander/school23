import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { IconUp } from '../icons';
import ScrollUpButton from 'react-scroll-up-button';

const SUp = ({ className }) => {
  return (
    <ScrollUpButton ContainerClassName="s-up" TransitionClassName="s-up__transition-up">
      <>
        <div className="s-up__button">
          <IconUp className="s-up__icon" />
        </div>
        <span className="s-up__text">Up</span>
      </>
    </ScrollUpButton>
  );
};

SUp.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default SUp;
