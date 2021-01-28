import React, { useReducer, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { arrayOf, bool, func, number, object, oneOfType, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import {
  routes,
  ADMIN_NEWS,
  ADMIN_PUBLIC_INFO,
  ADMIN_SCHOOL_CANTEEN,
  ADMIN_CLOCK,
  ADMIN_ACTIVITY
} from '../constants';
import { SRadioSlider, STransitionSwitch, SButton, SLoader } from '../components';
import { Page } from '../components/Page';
import actions from '../store/actions';
import { isBrowser } from '../utils';
import { Header } from '../components/Header';
import checkAuth from '../middlewares/checkAuth';

const AdminPostEditor = dynamic(() => import('../components/views/admin/AdminPostEditor'), {
  ssr: false
});

const AdminClockEditor = dynamic(() => import('../components/views/admin/AdminClockEditor'), {
  ssr: false
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'tab':
      return { ...state, tab: action.payload };
    case 'mounted':
      return { ...state, mounting: false };
    default:
      throw new Error();
  }
};

const Admin = ({ auth, isAuthServer, logout }) => {
  const [state, dispatch] = useReducer(reducer, {
    tab: ADMIN_NEWS,
    mounting: true
  });

  const renderEditor = () => {
    switch (state.tab) {
      case ADMIN_NEWS:
        return <AdminPostEditor type="post" />;
      case ADMIN_PUBLIC_INFO:
        return <AdminPostEditor type="page" />;
      case ADMIN_SCHOOL_CANTEEN:
        return <AdminPostEditor type="canteen" />;
      case ADMIN_ACTIVITY:
        return <AdminPostEditor type="activity" />;
      case ADMIN_CLOCK:
        return <AdminClockEditor />;
      default:
        return <AdminPostEditor />;
    }
  };

  const router = useRouter();

  const isAuth = isAuthServer || auth.status;

  useEffect(() => {
    if (isBrowser()) {
      dispatch({ type: 'mounted' });
      if (!isAuth) {
        router.push(routes.LOGIN);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  const onLogout = async () => {
    const ok = await logout();
    if (ok) {
      router.push(routes.HOME);
    }
  };

  const onTabChange = (payload) => dispatch({ type: 'tab', payload });

  return (
    <Page title="Кабінет адміністратора" className="admin">
      {isAuth && (
        <SLoader loading={state.mounting}>
          <>
            <Header title="Кабінет адміністратора" className="admin__header">
              <SButton onClick={onLogout} type="transparent" label="Вийти">
                <span role="img" aria-label="logout">
                  🔌
                </span>
              </SButton>
            </Header>
            <h3 className="admin__email">{auth?.user?.email}</h3>
            <div className="admin__container">
              <div className="admin__navigation">
                <SRadioSlider
                  className="mobile-fluid"
                  onChange={onTabChange}
                  name="law"
                  checked={state.tab}
                  tabs={[
                    ADMIN_NEWS,
                    ADMIN_PUBLIC_INFO,
                    ADMIN_ACTIVITY,
                    ADMIN_SCHOOL_CANTEEN,
                    ADMIN_CLOCK
                  ]}
                />
              </div>
              <div className="admin__view">
                <STransitionSwitch keyProp={state.tab}>{renderEditor()}</STransitionSwitch>
              </div>
            </div>
          </>
        </SLoader>
      )}
    </Page>
  );
};

Admin.defaultProps = {
  logout: () => undefined,
  auth: object,
  isAuthServer: false
};

Admin.propTypes = {
  logout: func,
  auth: shape({
    loading: bool,
    hasError: bool,
    status: bool,
    user: shape({
      displayName: string,
      email: string,
      emailVerified: bool,
      photoURL: string,
      isAnonymous: bool,
      uid: string,
      admin: false,
      providerData: arrayOf(oneOfType([object, string, number]))
    })
  }),
  isAuthServer: bool
};

Admin.getInitialProps = async (ctx) => {
  const isAuthServer = await checkAuth(ctx);
  return { isAuthServer };
};

export default connect(({ auth }) => ({ auth }), { logout: actions.auth.logout })(Admin);
