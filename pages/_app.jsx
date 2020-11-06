/* eslint-disable no-underscore-dangle */
import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import { compose } from 'redux';
import withGA from 'next-ga';
import SNavigation from '../components/navigation/SNavigation';
import { SLoader, STransitionSwitch } from '../components';
import { isBrowser } from '../utils';
import { wrapper } from '../store';
import '../plugins/bulma.css';
import '../scss/styles.scss';

class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    return {
      pageProps: {
        ...(Component && Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
      }
    };
  };

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
    this._ismounted = true;
    if (isBrowser()) {
      window.onload = () => {
        this.hideFirstLoading();
      };
      setTimeout(() => this.hideFirstLoading(), 4000);
    } else {
      setTimeout(() => this.hideFirstLoading(), 5000);
    }
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

export default compose(withGA('UA-214935287-1', Router), wrapper.withRedux)(MyApp);
