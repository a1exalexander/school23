import { actionType } from '../../constants';
import { db } from '../../firebase';
import { clockModel } from '../../models/clock';

const initState = {
  loading: false,
  hasError: false,
  time: { ...clockModel }
};

export const clockReducer = (state = { clock: { ...initState } }, action) => {
  switch (action.type) {
    case actionType.CLOCK_REQUEST:
      return {
        ...state.clock,
        loading: true,
        hasError: false
      };
    case actionType.CLOCK_SUCCESS:
      return {
        ...state.clock,
        loading: false,
        hasError: false
      };
    case actionType.CLOCK_UPDATE:
      return {
        ...state.clock,
        time: { ...action.payload }
      };
    case actionType.CLOCK_FAILURE:
      return {
        ...state.clock,
        loading: false,
        hasError: true
      };
    default:
      return state.clock;
  }
};

export const actions = {
  [actionType.CLOCK_UPDATE]: (payload) => {
    return {
      type: actionType.CLOCK_UPDATE,
      payload
    };
  },
  [actionType.CLOCK_REQUEST]: () => async (dispatch) => {
    dispatch(actionType.CLOCK_REQUEST);
    const res = await db.getClock();
    if (res) {
      dispatch(actions[actionType.CLOCK_UPDATE](res));
      dispatch(actionType.CLOCK_SUCCESS);
    } else {
      dispatch(actionType.CLOCK_FAILURE);
    }
  }
};

export default clockReducer;
