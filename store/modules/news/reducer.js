import { actionType } from '../../../constants';

const initState = {
  loading: false,
  hasError: false,
  posts: []
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
    case actionType.NEWS_UPDATE:
      return {
        ...state.news,
        posts: [...action.payload]
      };
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
