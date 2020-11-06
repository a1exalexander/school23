import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';
import ScrollUpButton from 'react-scroll-up-button';
import { IconUp } from '../icons';

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
      </>
    </ScrollUpButton>
  );
};

SUp.defaultProps = {
  className: ''
};

SUp.propTypes = {
  className: string
};

export default SUp;
