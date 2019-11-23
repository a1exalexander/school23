import React, { useEffect } from 'react';
import Meta from './Meta';
import '../scss/styles.scss';
import { connect } from 'react-redux';
import { actions } from '../store/modules/auth';
import firebase from '../firebase';
import TheNotifications from './TheNotifications';

const Page = ({ setAuthStatus, cleanAuth, userUpdate, children, title }) => {
  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        setAuthStatus(true);
        userUpdate(authUser);
      } else {
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
  userUpdate: actions.userUpdate,
  setAuthStatus: actions.setAuthStatus,
  cleanAuth: actions.cleanAuth,
})(Page);
