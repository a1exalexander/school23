import React from 'react';
import App from 'next/app';
import SNavigation from '../components/navigation/SNavigation';
import { SLoader, STransitionSwitch } from '../components';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import Router from 'next/router';
import { compose } from 'redux';
import withGA from 'next-ga';
import '../scss/styles.scss';
import '../plugins/bulma.css';

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  state = {
    loading: false,
  };

  constructor() {
    super();
    Router.onRouteChangeStart = (url) => {
      console.log('start loader');
      this.setState((prevState) => ({ ...prevState, loading: true }));
    };

    Router.onRouteChangeComplete = (url) => {
      console.log('end loader');
      this.setState((prevState) => ({ ...prevState, loading: false }));
    };

    Router.onRouteChangeError = (err, url) => {
      // an error occurred.
      // some error logic
    };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <>
        <Provider store={reduxStore}>
          <SNavigation />
          <STransitionSwitch keyProp={this.props.router.route}>
            <SLoader fluid full loading={this.state.loading}>
              <Component {...pageProps} />
            </SLoader>
          </STransitionSwitch>
        </Provider>
      </>
    );
  }
}

export default compose(withGA('UA-214935287-1', Router), withReduxStore)(MyApp);
