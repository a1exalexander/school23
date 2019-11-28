import { actionType } from '../../../constants';
import { db } from '../../../firebase';
import { actions as notifications } from '../notifications';
import moment from 'moment';

export const getNews = () => async (dispatch) => {
  dispatch(actionType.NEWS_REQUEST);
  const res = await db.getPosts();
  if (res) {
    const posts = res.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    posts.sort((a, b) => Number(b.created) - Number(a.created))
    dispatch({ type: actionType.NEWS_UPDATE, payload: posts });
    dispatch(actionType.NEWS_SUCCESS);
  } else {
    dispatch(actionType.NEWS_FAILURE);
    dispatch(notifications.notify('error', 'Помилка при завантаженні новин'));
  }
  return;
}
