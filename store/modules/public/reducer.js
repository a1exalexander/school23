import { actionType } from "../../../constants";

const initState = {
  loading: true,
  hasError: false,
  pages: [],
};

const reducer = (state = { publicInfo: {...initState } }, action) => {

  switch (action.type) {
    case actionType.PUBLIC_INFO_REQUEST:
      return {
        ...state.publicInfo,
        loading: true,
        hasError: false,
      };
    case actionType.PUBLIC_INFO_SUCCESS:
      return {
        ...state.publicInfo,
        loading: false,
        hasError: false,
      };
    case actionType.PUBLIC_INFO_UPDATE:
      return {
        ...state.publicInfo,
        pages: [...action.payload],
      }
    case actionType.PUBLIC_INFO_FAILURE:
      return {
        ...state.publicInfo,
        loading: false,
        hasError: true,
      }
    default:
      return state.publicInfo;
  }
};

export default reducer;
