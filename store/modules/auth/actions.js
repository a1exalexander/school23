import { actionType, routes } from '../../../constants';
import firebase, { auth, db, utils } from '../../../firebase';
import { actions as notifications } from '../notifications';
import nookies from 'nookies';

export const userUpdate = (user) => {
  return {
    type: actionType.AUTH_UPDATE,
    payload: utils.getUser(user),
  }
}

export const setAuthStatus = (status = false) => {
  return {
    type: actionType.AUTH_STATUS,
    payload: status,
  }
}

export const login = ({ email, password, admin = false }) => async (dispatch, getState) => {
  try {
    dispatch(actionType.AUTH_REQUEST);
    const { user } = await firebase.auth.signInWithEmailAndPassword(email, password);
    const { token } = await user.getIdTokenResult();
    nookies.set({}, 'ADMIN_TOKEN', token);
    dispatch({ type: actionType.AUTH_SUCCESS, payload: userUpdate(user) });
    dispatch(notifications.notify('success'));
  } catch(err) {
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
  }
  return;
}

export const cleanAuth = () => {
  nookies.destroy({}, 'ADMIN_TOKEN');
  return {type: actionType.AUTH_CLEAN}
}

export const logout = () => async (dispatch) => {
  try {
    await firebase.auth.signOut();
    dispatch(cleanAuth());
  } catch(err) {
    dispatch(notifications.notify('error'));
  }
}