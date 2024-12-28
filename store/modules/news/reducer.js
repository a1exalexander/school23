import { actionType } from '../../../constants';

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
      return {
        ...state.news,
        posts: [...action.payload.posts],
        lastVisible: action.payload.lastVisible,
        cache: {
          ...state.news.cache,
          [action.payload.currentPage]: action.payload.posts.slice(-10)
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
