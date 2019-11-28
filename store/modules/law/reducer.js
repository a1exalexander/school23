import { actionType } from "../../../constants";

const initState = {
  loading: true,
  hasError: false,
  docs: [],
};

const reducer = (state = { law: {...initState } }, action) => {

  switch (action.type) {
    case actionType.LAW_REQUEST:
      return {
        ...state.law,
        loading: true,
        hasError: false,
      };
    case actionType.LAW_SUCCESS:
      return {
        ...state.law,
        loading: false,
        hasError: false,
      };
    case actionType.LAW_UPDATE:
      return {
        ...state.law,
        docs: [...action.payload],
      }
    case actionType.LAW_FAILURE:
      return {
        ...state.law,
        loading: false,
        hasError: true,
      }
    default:
      return state.law;
  }
};

export default reducer;
