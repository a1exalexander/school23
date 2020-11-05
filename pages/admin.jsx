import React, { useReducer, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import {
  routes,
  ADMIN_NEWS,
  ADMIN_LAW,
  ADMIN_TEACHERS,
  ADMIN_CONTACTS,
  ADMIN_PUBLIC_INFO,
} from '../constants';
import { Page, SRadioSlider, STransitionSwitch, SButton, SLoader } from '../components';
import { connect } from 'react-redux';
import actions from '../store/actions';
import checkAuth from '../middlewares/checkAuth';
import { useRouter } from 'next/router';

const AdminPost = dynamic(() => import('../components/views/admin/AdminPost'), { ssr: false });
const AdminPublicInfo = dynamic(() => import('../components/views/admin/AdminPublicInfo'), { ssr: false });

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
    mounting: true,
  });
  const rendered = () => {
    switch (state.tab) {
      case ADMIN_NEWS:
        return <AdminPost />;
      case ADMIN_PUBLIC_INFO:
        return <AdminPublicInfo />;
      default:
        return <AdminPost />;
    }
  };

  const router = useRouter();

  const isAuth = isAuthServer || auth.status;

  useEffect(() => {
    if (process.browser) dispatch({ type: 'mounted' });
  }, []);

  useEffect(() => {
    if (![!!process.browser, !auth.loading, !state.mounting, !isAuth].includes(false)) {
      router.push(routes.LOGIN);
    }
  }, [state, auth]);

  const onLogout = async () => {
    const ok = await logout();
    if (ok) {
      router.push(routes.HOME);
    }
  };

  const onTabChange = (payload) => dispatch({ type: 'tab', payload });

  return (
    <Page title="Кабінет адміністратора">
      <SLoader loading={auth.loading || !isAuth}>
        {isAuth && (
          <div className="admin">
            <SLoader loading={state.mounting || !isAuth}>
              <>
                <div className="admin__header">
                  <h1 className="admin__title">Кабінет адміністратора</h1>
                  <SButton onClick={onLogout} type="transparent" label="Вийти">
                    <span role="img" area-label="logout">
                      🔌
                    </span>
                  </SButton>
                </div>

                <div className="admin__container">
                  <div className="admin__navigation">
                    <SRadioSlider
                      className="mobile-fluid"
                      onChange={onTabChange}
                      name="law"
                      checked={state.tab}
                      tabs={[ADMIN_NEWS, ADMIN_PUBLIC_INFO]}
                    />
                  </div>
                  <div className="admin__view">
                    <STransitionSwitch keyProp={state.tab}>{rendered()}</STransitionSwitch>
                  </div>
                </div>
              </>
            </SLoader>
          </div>
        )}
      </SLoader>
    </Page>
  );
};

Admin.propTypes = {
  logout: PropTypes.func,
  auth: PropTypes.object,
};

Admin.getInitialProps = async (ctx) => {
  const isAuthServer = await checkAuth(ctx);
  return { isAuthServer };
};

export default connect(({ auth }) => ({ auth }), { logout: actions.auth.logout })(Admin);
