import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store/modules/auth';
import { firebase } from '../firebase';
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

export default connect(null, {
  authRequest: actions.authRequest,
  authSuccess: actions.authSuccess,
  authFailure: actions.authFailure,
  userUpdate: actions.userUpdate,
  setAuthStatus: actions.setAuthStatus,
  cleanAuth: actions.cleanAuth
})(Page);
