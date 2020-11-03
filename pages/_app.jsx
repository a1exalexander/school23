import React from 'react';
import App from 'next/app';
import SNavigation from '../components/navigation/SNavigation';
import { SLoader, STransitionSwitch } from '../components';
import { Provider } from 'react-redux';
import Router from 'next/router';
import { compose } from 'redux';
import withGA from 'next-ga';
import '../scss/styles.scss';
import '../plugins/bulma.css';
import { isBrowser } from '../utils';
import { wrapper } from '../store';

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);

  //   return { ...appProps };
  // }

  static getInitialProps = async ({ Component, ctx }) => {
    // Keep in mind that this will be called twice on server, one for page and second for error page

    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component && Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        // Some custom thing for all pages
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
