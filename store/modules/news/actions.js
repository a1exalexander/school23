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

  // Fetch posts and total count
  const [postsResult, totalCount] = await Promise.all([
    db.getPosts(currentPage, itemsPerPage, searchQuery),
    searchQuery ? null : db.getPostsCount() // Only get count for non-search queries
  ]);

  const { posts } = postsResult || {};
  if (posts) {
    posts.sort((a, b) => Number(b.created) - Number(a.created));
    dispatch({
      type: searchQuery ? actionType.NEWS_SET : actionType.NEWS_UPDATE,
      payload: { posts, currentPage, totalCount }
    });
    dispatch(actionType.NEWS_SUCCESS);
  } else {
    dispatch(actionType.NEWS_FAILURE);
    dispatch(notifications.notify('error', 'Помилка при завантаженні новин'));
  }
};

export const updatePostLikes = (postId, newLikesCount) => ({
  type: actionType.NEWS_UPDATE_LIKES,
  payload: { postId, newLikesCount }
});

export default { getNews, updatePostLikes };
