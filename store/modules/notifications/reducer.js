import { actionType } from "../../../constants";

const initState = {
  list: [],
};

const reducer = (state = { notifications: {...initState } }, action) => {

  switch (action.type) {
    case actionType.NOTIFICATIONS_UPDATE:
      return {
        ...state.notifications,
        list: [...action.payload],
      }
    case actionType.NOTIFICATIONS_CLEAN_ALL:
      return {
        ...state.notifications,
        list: [],
      }
    default:
      return state.notifications;
  }
};

export default reducer;
