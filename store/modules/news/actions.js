import { actionType } from '../../../constants';
import { db } from '../../../firebase';
import { actions as notifications } from '../notifications';

export const getNews = (currentPage, itemsPerPage, searchQuery = '') => async (
  dispatch,
  getState
) => {
  const cache = getState().news.cache?.[currentPage];
  if (cache && !searchQuery) {
    dispatch({
      type: actionType.NEWS_SET,
      payload: { posts: [] }
    });
    return;
  }
  dispatch(actionType.NEWS_REQUEST);
  const { posts } = await db.getPosts(currentPage, itemsPerPage, searchQuery);
  if (posts) {
    posts.sort((a, b) => Number(b.created) - Number(a.created));
    dispatch({
      type: searchQuery ? actionType.NEWS_SET : actionType.NEWS_UPDATE,
      payload: { posts, currentPage }
    });
    dispatch(actionType.NEWS_SUCCESS);
  } else {
    dispatch(actionType.NEWS_FAILURE);
    dispatch(notifications.notify('error', 'Помилка при завантаженні новин'));
  }
};

export default { getNews };
