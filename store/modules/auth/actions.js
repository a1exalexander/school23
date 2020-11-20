import nookies from 'nookies';
import { actionType } from '../../../constants';
import { utils, firebase } from '../../../firebase';
import { actions as notifications } from '../notifications';

export const authRequest = () => ({ type: actionType.AUTH_REQUEST });
export const authSuccess = () => ({ type: actionType.AUTH_SUCCESS });
export const authFailure = () => ({ type: actionType.AUTH_FAILURE });

export const userUpdate = (user) => {
  return {
    type: actionType.AUTH_UPDATE,
    payload: utils.getUser(user)
  };
};

export const setAuthStatus = (status = false) => {
  return {
    type: actionType.AUTH_STATUS,
    payload: status
  };
};

export const cleanAuth = () => {
  nookies.destroy({}, 'ADMIN_TOKEN');
  localStorage.removeItem('ADMIN_TOKEN');
  return { type: actionType.AUTH_CLEAN };
};

export const login = ({ email, password }) => async (dispatch) => {
  try {
    dispatch(actionType.AUTH_REQUEST);
    const { user } = await firebase.auth.signInWithEmailAndPassword(email, password);
    const { token } = await user.getIdTokenResult();
    nookies.set({}, 'ADMIN_TOKEN', token);
    localStorage.setItem('ADMIN_TOKEN', token);
    dispatch({ type: actionType.AUTH_SUCCESS, payload: userUpdate(user) });
    dispatch(notifications.notify('success', 'Успішна авторизація'));
    return true;
  } catch (err) {
    dispatch(actionType.AUTH_FAILURE);
    switch (err.code) {
      case 'auth/user-not-found':
        dispatch(notifications.notify('error', 'Дані введено не правильно'));
        break;
      case 'auth/invalid-email':
        dispatch(notifications.notify('error', 'Імейл введено не правильно'));
        break;
      default:
        dispatch(notifications.notify('error'));
        break;
    }
    dispatch(cleanAuth());
    return false;
  }
};

export const logout = () => async (dispatch) => {
  try {
    await firebase.auth.signOut();
    dispatch(cleanAuth());
    dispatch(setAuthStatus(false));
    return true;
  } catch (err) {
    dispatch(notifications.notify('error'));
    return false;
  }
};
