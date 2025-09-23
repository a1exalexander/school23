import { actionType } from '../../../constants';

const initState = {
  loading: false,
  hasError: false,
  posts: [],
  cache: null,
  lastVisible: null,
  totalCount: 0
};

const reducer = (state = { news: { ...initState } }, action) => {
  switch (action.type) {
    case actionType.NEWS_REQUEST:
      return {
        ...state.news,
        loading: true,
        hasError: false
      };
    case actionType.NEWS_SUCCESS:
      return {
        ...state.news,
        loading: false,
        hasError: false
      };
    case actionType.NEWS_SET: {
      return {
        ...state.news,
        posts: [...action.payload.posts]
      };
    }
    case actionType.NEWS_UPDATE: {
      const { posts, currentPage, totalCount } = action.payload;

      // Store posts directly for the specific page
      const updatedCache = {
        ...state.news.cache,
        [currentPage]: posts
      };

      return {
        ...state.news,
        posts, // Current page posts
        cache: updatedCache,
        totalCount: totalCount || state.news.totalCount
      };
    }
    case actionType.NEWS_UPDATE_LIKES: {
      const { postId, newLikesCount } = action.payload;

      // Update likes in all cached pages and current posts
      const updatePostLikes = (posts) =>
        posts?.map((post) => (post.id === postId ? { ...post, likes: newLikesCount } : post)) || [];

      // Update cache for all pages
      const updatedCache = {};
      if (state.news.cache) {
        Object.keys(state.news.cache).forEach((pageKey) => {
          updatedCache[pageKey] = updatePostLikes(state.news.cache[pageKey]);
        });
      }

      return {
        ...state.news,
        posts: updatePostLikes(state.news.posts),
        cache: updatedCache
      };
    }
    case actionType.NEWS_FAILURE:
      return {
        ...state.news,
        loading: false,
        hasError: true
      };
    default:
      return state.news;
  }
};

export default reducer;
