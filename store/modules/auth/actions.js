import { actionType } from 'constant';
import { http } from 'services';

export const login = () => async (dispatch) => {
  dispatch(actionType.AUTH_REQUEST);
  try {
    const payload = await http.login();
    dispatch([actionType.AUTH_SUCCESS, payload]);
  } catch(e) {
    dispatch(actionType.AUTH_FAILURE);
  }
}
