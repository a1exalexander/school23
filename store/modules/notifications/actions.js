import { actionType } from '../../../constants';
import { isNumber } from '../../../utils';
import uuid from 'uuid';

export const removeNotification = (tergetId) => (dispatch, getState) => {
  const payload = [...getState().notifications.list];
  const idx = payload.findIndex(({ id }) => String(id) === String(tergetId));
  if (isNumber(idx)) {
    payload.splice(idx, 1);
    dispatch({
      type: actionType.NOTIFICATIONS_UPDATE,
      payload,
    })
  }
}

export const notify = (type = 'success', message, timeout = 4000) => (dispatch, getState) => {
  const correntTimeout = isNumber(Number(timeout)) ? Number(timeout) : 4000;
  const payload = [...getState().notifications.list];
  const id = uuid();
  payload.push({
    message,
    id,
    type,
  });
  dispatch({
    type: actionType.NOTIFICATIONS_UPDATE,
    payload,
  })
  setTimeout(() => {
    removeNotification(id)(dispatch, getState);
  }, correntTimeout)
}


