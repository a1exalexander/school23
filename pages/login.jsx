import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Page, SInput, SButton, SLoader } from '../components';
import { connect } from 'react-redux';
import actions from '../store/actions';
import { routes } from '../constants';
import checkAuth from '../middlewares/checkAuth';
import Router from 'next/router';

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: action.payload };
    case 'mounted':
      return { ...state, mounting: false };
    case 'email':
      return { ...state, email: action.payload };
    case 'password':
      return { ...state, password: action.payload };
    default:
      throw new Error();
  }
}

const Login = ({ logout, auth, login }) => {
  const [state, dispatch] = useReducer(reducer, {
    mounting: true,
    loading: false,
    email: 'alexander.ratushnyi@gmail.com',
    password: 'rov14088650'
  });

  const onSubmit = async (event) => {
    dispatch({ type: 'loading', payload: true })
    event.preventDefault();
    const { email, password } = state;
    await login({ email, password });
    dispatch({ type: 'loading', payload: false })
  };

  const handleChange = type => payload => dispatch({ type, payload });

  useEffect(() => {
    dispatch({ type: 'mounted' })
  }, [])

  useEffect(() => {
    if (auth.status) {
      Router.push(routes.ADMIN, routes.ADMIN)
    }
  }, [auth.status])

  const isNotAuth = (
    <div className="login__form">
      <SInput className="login__input" autoComplete='off' required onChange={handleChange('email')} value={state.email} validator="email">Імейл</SInput>
      <SInput className="login__input" autoComplete='off' required onChange={handleChange('password')} value={state.password} type="password">Пароль</SInput>
      <SButton loading={state.loading} onClick={onSubmit} label='Увійти'/>
    </div>
  )

  return (
    <Page title="Авторизація">
      <div className="login">
        <h1 className="login__title">Авторизація</h1>
        <SLoader fluid className="login__loader" loading={state.mounting || auth.status}>{isNotAuth}</SLoader>
      </div>
    </Page>
  );
};

Login.propTypes = {
  auth: PropTypes.object,
  login: PropTypes.func,
  logout: PropTypes.func,
  status: PropTypes.bool,
}

Login.getInitialProps = async (ctx) => {
  await checkAuth(ctx);
  return {};
}

export default connect(
  ({ auth }) => ({ auth }),
  {
    login: actions.auth.login,
    logout: actions.auth.logout,
  }
)(Login);
