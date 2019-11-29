import { actionType } from "../../../constants";

const initState = {
  loading: true,
  hasError: false,
  list: [],
};

const reducer = (state = { teachers: {...initState } }, action) => {

  switch (action.type) {
    case actionType.TEACHERS_REQUEST:
      return {
        ...state.teachers,
        loading: true,
        hasError: false,
      };
    case actionType.TEACHERS_SUCCESS:
      return {
        ...state.teachers,
        loading: false,
        hasError: false,
      };
    case actionType.TEACHERS_UPDATE:
      return {
        ...state.teachers,
        list: [...action.payload],
      }
    case actionType.TEACHERS_FAILURE:
      return {
        ...state.teachers,
        loading: false,
        hasError: true,
      }
    default:
      return state.teachers;
  }
};

export default reducer;
