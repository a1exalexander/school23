import { actionType, ITEMS_PER_PAGE } from '../../../constants';

const initState = {
  loading: false,
  hasError: false,
  posts: [],
  cache: {},
  lastVisible: null
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
    case actionType.NEWS_UPDATE: {
      const groudedPostsByPage = action.payload.posts.reduce((acc, post, currentIndex) => {
        const page = Math.floor(currentIndex / ITEMS_PER_PAGE) + 1;
        if (!acc[page]) {
          acc[page] = [];
        }
        acc[page].push(post);
        return acc;
      }, {});
      return {
        ...state.news,
        posts: [...action.payload.posts],
        lastVisible: action.payload.lastVisible,
        cache: {
          ...state.news.cache,
          ...groudedPostsByPage
        }
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
