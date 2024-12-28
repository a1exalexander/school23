import { actionType } from '../../../constants';
import { db } from '../../../firebase';
import { actions as notifications } from '../notifications';

export const getNews = (currentPage, itemsPerPage) => async (dispatch, getState) => {
  const cache = getState().news.cache?.[currentPage];
  if (cache) {
    return;
  }
  dispatch(actionType.NEWS_REQUEST);
  const { posts } = await db.getPosts(currentPage, itemsPerPage);
  if (posts) {
    posts.sort((a, b) => Number(b.created) - Number(a.created));
    dispatch({
      type: actionType.NEWS_UPDATE,
      payload: { posts, currentPage }
    });
    dispatch(actionType.NEWS_SUCCESS);
  } else {
    dispatch(actionType.NEWS_FAILURE);
    dispatch(notifications.notify('error', 'Помилка при завантаженні новин'));
  }
};

export default { getNews };
