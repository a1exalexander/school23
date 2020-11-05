import nookies from 'nookies';
import { actionType } from '../../../constants';
import { utils } from '../../../firebase';

const getInitState = () => ({
  loading: true,
  hasError: false,
  status: !!nookies.get({}).ADMIN_TOKEN,
  user: { ...utils.getUser() }
});

const reducer = (state = { auth: { ...getInitState() } }, action) => {
  switch (action.type) {
    case actionType.AUTH_REQUEST:
      return {
        ...state.auth,
        loading: true,
        hasError: false
      };
    case actionType.AUTH_SUCCESS:
      return {
        ...state.auth,
        loading: false,
        hasError: false,
        user: { ...action.payload }
      };
    case actionType.AUTH_FAILURE:
      return {
        ...state.auth,
        loading: false,
        hasError: true
      };
    case actionType.AUTH_STATUS:
      return {
        ...state.auth,
        status: action.payload
      };
    case actionType.AUTH_UPDATE:
      return {
        ...state.auth,
        user: { ...action.payload }
      };
    case actionType.AUTH_CLEAN:
      return {
        ...getInitState()
      };
    default:
      return state.auth;
  }
};

export default reducer;
