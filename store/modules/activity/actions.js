import { actionType } from '../../../constants';
import { db } from '../../../firebase';
import { actions as notifications } from '../notifications';

export const getActivityPosts = () => async (dispatch) => {
  dispatch(actionType.ACTIVITY_REQUEST);
  const res = await db.getAllActivityPosts();
  if (res) {
    res.sort((a, b) => Number(b.created) - Number(a.created));
    dispatch({ type: actionType.ACTIVITY_UPDATE, payload: res });
    dispatch(actionType.ACTIVITY_SUCCESS);
  } else {
    dispatch(actionType.ACTIVITY_FAILURE);
    dispatch(notifications.notify('error', 'Помилка при завантаженні'));
  }
};

export default { getActivityPosts };
