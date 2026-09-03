import React from 'react';
import classNames from 'classnames';
import { number, oneOfType, string } from 'prop-types';

export const YearDivider = ({ year, className }) => (
  <div
    className={classNames('year-divider', className)}
    role="separator"
    aria-label={`${year} рік`}
  >
    <span className="year-divider__label">{year}</span>
  </div>
);

YearDivider.defaultProps = {
  className: undefined
};

YearDivider.propTypes = {
  year: oneOfType([number, string]).isRequired,
  className: string
};

export default YearDivider;
