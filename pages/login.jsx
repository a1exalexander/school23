import React, { useReducer, useEffect } from 'react';
import PropTypes, { bool, number, object, oneOfType, string } from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { SInput, SButton, SLoader } from '../components';
import { Page } from '../components/Page';
import actions from '../store/actions';
import { routes } from '../constants';
import { isBrowser } from '../utils';
import { Header } from '../components/Header';

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

const Login = ({ auth, login }) => {
  const [state, dispatch] = useReducer(reducer, {
    mounting: true,
    loading: false,
    email: '',
    password: ''
  });

  const router = useRouter();

  const onSubmit = async (event) => {
    if (event) event.preventDefault();
    dispatch({ type: 'loading', payload: true });
    const { email, password } = state;
    const ok = await login({ email, password });
    dispatch({ type: 'loading', payload: false });
    if (ok) router.push(routes.ADMIN);
  };

  const handleChange = (type) => (payload) => dispatch({ type, payload });

  useEffect(() => {
    dispatch({ type: 'mounted' });
  }, []);

  const isAuth = auth.status;

  useEffect(() => {
    if (isBrowser() && isAuth) {
      router.push(routes.ADMIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderForm = () => (
    <form className="login__form" onSubmit={onSubmit}>
      <SInput
        className="login__input"
        autoComplete="on"
        required
        onChange={handleChange('email')}
        value={state.email}
        validator="email"
      >
        Імейл
      </SInput>
      <SInput
        className="login__input"
        autoComplete="on"
        required
        onChange={handleChange('password')}
        value={state.password}
        type="password"
      >
        Пароль
      </SInput>
      <SButton buttonType="submit" loading={state.loading} label="Увійти" />
    </form>
  );

  return (
    <Page title="Авторизація" className="login">
      <Header title="Авторизація" />
      <SLoader className="login__loader" loading={state.loading}>
        {renderForm()}
      </SLoader>
    </Page>
  );
};

Login.defaultProps = {
  auth: undefined,
  login: () => undefined,
  status: false
};

Login.propTypes = {
  auth: PropTypes.objectOf(oneOfType([string, number, bool, object])),
  login: PropTypes.func,
  status: PropTypes.bool
};

export default connect(({ auth }) => ({ auth }), {
  login: actions.auth.login,
  logout: actions.auth.logout
})(Login);
