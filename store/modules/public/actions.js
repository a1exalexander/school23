import { actionType } from '../../../constants';
import { db } from '../../../firebase';
import { actions as notifications } from '../notifications';

export const getPublicInfo = () => async (dispatch) => {
  dispatch(actionType.PUBLIC_INFO_REQUEST);
  const res = await db.getAllPublicInfo();
  if (res) {
    res.sort((a, b) => Number(b.created) - Number(a.created));
    dispatch({ type: actionType.PUBLIC_INFO_UPDATE, payload: res });
    dispatch(actionType.PUBLIC_INFO_SUCCESS);
  } else {
    dispatch(actionType.PUBLIC_INFO_FAILURE);
    dispatch(notifications.notify('error', 'Помилка при завантаженні новин'));
  }
  return;
};
