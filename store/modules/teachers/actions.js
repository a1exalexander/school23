import { actionType } from '../../../constants';
import { db } from '../../../firebase';
import { actions as notifications } from '../notifications';
import { storage } from '../../../firebase';

export const fetchData = () => async (dispatch) => {
  dispatch(actionType.TEACHERS_REQUEST);
  const res = await db.getTeachers();
  if (res) {
    dispatch({ type: actionType.TEACHERS_UPDATE, payload: res });
    dispatch(actionType.TEACHERS_SUCCESS);
  } else {
    dispatch(actionType.TEACHERS_FAILURE);
    dispatch(notifications.notify('error', 'Помилка при завантаженні даних'));
  }
  return;
}

export const deleteTeacher = (profile) => async (dispatch, getState) => {
  const shallow = {...profile};
  const resD = await db.removeTeacher(shallow.id);
  const resS = await storage.deletePhotoTeacher(shallow.fileName);
  if (resS && resD) {
    const docs = [...getState().teachers.list];
    const idx = docs.findIndex(({ id }) => id === shallow.id);
    docs.splice(idx, 1);
    dispatch({ type: actionType.TEACHERS_UPDATE, payload: docs });
    dispatch(notifications.notify('info', 'Профайл видалено'));
  } else {
    dispatch(notifications.notify('error', 'Помилка при видаленні профайла'));
  }
  return;
}
