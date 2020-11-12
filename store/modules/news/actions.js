import { actionType } from '../../../constants';
import { db } from '../../../firebase';
import { actions as notifications } from '../notifications';

export const getNews = () => async (dispatch) => {
  dispatch(actionType.NEWS_REQUEST);
  const res = await db.getPosts();
  if (res) {
    res.sort((a, b) => Number(b.created) - Number(a.created));
    dispatch({ type: actionType.NEWS_UPDATE, payload: res });
    dispatch(actionType.NEWS_SUCCESS);
  } else {
    dispatch(actionType.NEWS_FAILURE);
    dispatch(notifications.notify('error', 'Помилка при завантаженні новин'));
  }
};

export default { getNews };
