import React, { useReducer, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { routes, ADMIN_NEWS, ADMIN_LAW, ADMIN_TEACHERS, ADMIN_CONTACTS } from '../constants';
import { Page, SRadioSlider, STransitionSwitch, SButton, SLoader } from '../components';
import { connect } from 'react-redux';
import actions from '../store/actions';
import Router from 'next/router';
import checkAuth from '../middlewares/checkAuth';
import Head from 'next/head';

const AdminPost = dynamic(() => import('../components/views/admin/AdminPost'), { ssr: false });

const reducer = (state, action) => {
  switch (action.type) {
    case 'tab':
      return { ...state, tab: action.payload };
    case 'mounted':
      return { ...state, mounting: false };
    default:
      throw new Error();
  }
}

const Admin = ({ auth, logout }) => {
  const [state, dispatch] = useReducer(reducer, {
    tab: ADMIN_NEWS,
    mounting: true
  });
  const rendred = () => {
    switch (state) {
      case ADMIN_NEWS:
        return <AdminPost />;
      default:
        return <AdminPost />;
    }
  };

  useEffect(() => {
    if (process.browser) dispatch({ type: 'mounted' });
  }, []);

  useEffect(() => {
    if (state.mounting && !auth.status) {
      Router.push(routes.HOME);
    }
  }, [state.mounting, auth.status]);

  const onLogout = async () => {
    const ok = await logout();
    if (ok) Router.push(routes.HOME);
  };

  const onTabChange = payload => dispatch({ type: 'tab', payload });

  return (
    <Page title="Кабінет адміністратора">
      <div className="admin">
        <SLoader fluid loading={state.mounting || !auth.status}>
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
                  tabs={[ADMIN_NEWS, ADMIN_LAW, ADMIN_TEACHERS, ADMIN_CONTACTS]}
                />
              </div>
              <div className="admin__view">
                <STransitionSwitch keyProp={state.tab}>{rendred()}</STransitionSwitch>
              </div>
            </div>
          </>
        </SLoader>
      </div>
    </Page>
  );
};

Admin.propTypes = {
  logout: PropTypes.func,
  auth: PropTypes.object
};

Admin.getInitialProps = async (ctx) => {
  await checkAuth(ctx);
  return {};
}

export default connect(({ auth }) => ({ auth }), { logout: actions.auth.logout })(Admin);
