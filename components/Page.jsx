import React, { useEffect } from 'react';
import Meta from './Meta';
import { connect } from 'react-redux';
import { actions } from '../store/modules/auth';
import firebase from '../firebase';
import TheNotifications from './TheNotifications';

const Page = ({ setAuthStatus, authRequest, authSuccess, authFailure, cleanAuth, userUpdate, children, title }) => {
  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(async authUser => {
      authRequest();
      if (authUser) {
        setAuthStatus(true);
        userUpdate(authUser);
        authSuccess();
      } else {
        authFailure();
        await cleanAuth();
      }
    });
    return () => unsubscribe();
  }, []);

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
  cleanAuth: actions.cleanAuth,
})(Page);
