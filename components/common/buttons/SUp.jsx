import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';
import { IconUp } from '../icons';
import ScrollUpButton from 'react-scroll-up-button';

export const SUp = ({ className = '' }) => {
  return (
    <ScrollUpButton
      ContainerClassName={classNames('s-up', className)}
      TransitionClassName="s-up__transition-up"
    >
      <>
        <div className="s-up__button">
          <IconUp className="s-up__icon" />
        </div>
        <span className="s-up__text">Up</span>
      </>
    </ScrollUpButton>
  );
};

SUp.defaultTypes = {
  className: '',
};

SUp.propTypes = {
  className: string,
};

export default SUp;
