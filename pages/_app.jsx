import React from 'react';
import App from 'next/app';
import SNavigation from '../components/navigation/SNavigation';
import { STransitionSwitch } from '../components';
import withReduxStore from '../lib/with-redux-store'
import { Provider } from "react-redux";
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

  render() {

    const { Component, pageProps, reduxStore } = this.props;
    return (
      <>
        <Provider store={reduxStore}>
          <SNavigation />
          <STransitionSwitch keyProp={this.props.router.route}>
            <Component {...pageProps} />
          </STransitionSwitch>
        </Provider>
      </>
    );
  }
}

export default withReduxStore(MyApp);
