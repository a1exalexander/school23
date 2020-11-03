import React from 'react';
import App from 'next/app';
import SNavigation from '../components/navigation/SNavigation';
import { SLoader, STransitionSwitch } from '../components';
import Router from 'next/router';
import { compose } from 'redux';
import withGA from 'next-ga';
import '../scss/styles.scss';
import '../plugins/bulma.css';
import { isBrowser } from '../utils';
import { wrapper } from '../store';

class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    return {
      pageProps: {
        ...(Component && Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      },
    };
  };

  state = {
    onloadLoading: true,
    loading: false,
  };

  constructor() {
    super();
    Router.onRouteChangeStart = (url) => {
      this.setState((prevState) => ({ ...prevState, loading: true }));
    };

    Router.onRouteChangeComplete = (url) => {
      this.setState((prevState) => ({ ...prevState, loading: false }));
    };

    Router.onRouteChangeError = (err, url) => {
      this.setState((prevState) => ({ ...prevState, loading: false }));
    };
  }

  hideFirstLoading() {
    this.setState((prevState) => ({ ...prevState, onloadLoading: false }));
  }

  componentDidMount() {
    if (isBrowser()) {
      window.onload = (event) => {
        this.hideFirstLoading();
      };
    }
  }

  componentDidUpdate() {
    if (isBrowser() && document && document.readyState === 'complete') {
      this.hideFirstLoading();
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
            <Component {...pageProps} />
          </STransitionSwitch>
        </SLoader>
      </>
    );
  }
}

export default compose(withGA('UA-214935287-1', Router), wrapper.withRedux)(MyApp);
