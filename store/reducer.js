import auth from './modules/auth';
import notifications from './modules/notifications';

const reducer = (state, action) => {
  return {
    auth: auth.reducer(state, action),
    notifications: notifications.reducer(state, action),
  }
}

export default reducer;
