import { node, string } from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Meta } from './Meta';
import TheNotifications from './TheNotifications';

export const Page = ({ children, title, className }) => {
  return (
    <>
      <Meta title={title} />
      <TheNotifications />
      <div className={classNames('Page', className)}>{children}</div>
    </>
  );
};

Page.defaultProps = {
  children: undefined,
  title: undefined,
  className: undefined
};

Page.propTypes = {
  children: node,
  title: string,
  className: string
};

export default Page;
