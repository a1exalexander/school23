/* eslint-disable no-underscore-dangle */
import React from 'react';
import App from 'next/app';
import { connect } from 'react-redux';
import Router from 'next/router';
import { compose } from 'redux';
import withGA from 'next-ga';
import SNavigation from '../components/navigation/SNavigation';
import { SLoader, STransitionSwitch } from '../components';
import { isBrowser } from '../utils';
import { wrapper } from '../store';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';
import '../plugins/bulma.css';
import '../scss/styles.scss';
import { actions } from '../store/modules/auth';
import { actions as clockActions } from '../store/modules/clock';
import { firebase } from '../firebase';
import { actionType } from '../constants';

class MyApp extends App {
  // static getInitialProps = async ({ Component, ctx }) => {
  //   let pageProps = {};
  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }

  //   return { pageProps };
  // };

  state = {
    onloadLoading: true,
    loading: false,
    readyState: 'not ready'
  };

  _ismounted = false;

  constructor() {
    super();
    Router.onRouteChangeStart = () => {
      if (this._ismounted) {
        this.showLoader();
        setTimeout(() => this.showLoader(), 500);
      }
    };

    Router.onRouteChangeComplete = () => {
      if (this._ismounted) {
        this.hideLoader();
        setTimeout(() => this.hideLoader(), 500);
      }
    };

    Router.onRouteChangeError = () => {
      if (this._ismounted) {
        this.hideLoader();
        setTimeout(() => this.hideLoader(), 500);
      }
    };
  }

  showLoader() {
    this.setState((prevState) => ({ ...prevState, loading: true }));
    this.hideFirstLoading();
  }

  hideLoader() {
    this.setState((prevState) => ({ ...prevState, loading: false }));
  }

  hideFirstLoading() {
    if (this._ismounted) {
      this.setState((prevState) => ({ ...prevState, onloadLoading: false }));
    }
  }

  componentDidMount() {
    const {
      setAuthStatus,
      authRequest,
      authSuccess,
      authFailure,
      cleanAuth,
      userUpdate
    } = this.props;
    this._ismounted = true;
    if (isBrowser()) {
      window.onload = () => {
        this.hideFirstLoading();
      };
      setTimeout(() => this.hideFirstLoading(), 4000);
    } else {
      setTimeout(() => this.hideFirstLoading(), 5000);
    }

    this.props.getClock();

    const unsubscribe = firebase.auth.onAuthStateChanged(async (authUser) => {
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
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  componentDidUpdate(prevProp, prevState) {
    const readyState = isBrowser() && document && document.readyState;
    if (prevState.readyState !== readyState) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState((state) => ({ ...state, readyState }));
      if (readyState === 'complete') {
        this.hideFirstLoading();
      }
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    const { onloadLoading, loading } = this.state;
    return (
      <>
        {!onloadLoading && <SNavigation />}
        <SLoader dark={onloadLoading} loading={onloadLoading || loading}>
          <STransitionSwitch keyProp={this.props.router.route}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </STransitionSwitch>
        </SLoader>
      </>
    );
  }
}

export default compose(
  withGA('UA-214935287-1', Router),
  wrapper.withRedux,
  connect(null, {
    authRequest: actions.authRequest,
    authSuccess: actions.authSuccess,
    authFailure: actions.authFailure,
    userUpdate: actions.userUpdate,
    setAuthStatus: actions.setAuthStatus,
    cleanAuth: actions.cleanAuth,
    getClock: clockActions[actionType.CLOCK_REQUEST]
  })
)(MyApp);
