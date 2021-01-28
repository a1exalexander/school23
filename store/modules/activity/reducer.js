import { actionType } from '../../../constants';

const initState = {
  loading: true,
  hasError: false,
  pages: []
};

const reducer = (state = { activity: { ...initState } }, action) => {
  switch (action.type) {
    case actionType.ACTIVITY_REQUEST:
      return {
        ...state.activity,
        loading: true,
        hasError: false
      };
    case actionType.ACTIVITY_SUCCESS:
      return {
        ...state.activity,
        loading: false,
        hasError: false
      };
    case actionType.ACTIVITY_UPDATE:
      return {
        ...state.activity,
        pages: [...action.payload]
      };
    case actionType.ACTIVITY_FAILURE:
      return {
        ...state.activity,
        loading: false,
        hasError: true
      };
    default:
      return state.activity;
  }
};

export default reducer;
