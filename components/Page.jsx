import { node, string } from 'prop-types';
import React from 'react';
import { Meta } from './Meta';
import TheNotifications from './TheNotifications';

const Page = ({ children, title }) => {
  return (
    <>
      <Meta title={title} />
      <TheNotifications />
      {children}
    </>
  );
};

Page.defaultProps = {
  children: undefined,
  title: undefined
};

Page.propTypes = {
  children: node,
  title: string
};

export default Page;
