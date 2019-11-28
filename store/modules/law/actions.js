import { actionType } from '../../../constants';
import { db, storage } from '../../../firebase';
import { actions as notifications } from '../notifications';

export const fetchData = () => async (dispatch) => {
  dispatch(actionType.LAW_REQUEST);
  const res = await db.getDocuments();
  if (res) {
    dispatch({ type: actionType.LAW_UPDATE, payload: res });
    dispatch(actionType.LAW_SUCCESS);
  } else {
    dispatch(actionType.LAW_FAILURE);
    dispatch(notifications.notify('error', 'Помилка при завантаженні документів'));
  }
}

export const deleteDoc = (p) => async (dispatch, getState) => {
  const doc = {...p};
  const resD = await db.removeDocument(doc.id);
  const resS = await storage.deleteDocument(doc.fileName);
  if (resS && resD) {
    const docs = [...getState().law.docs];
    const idx = docs.findIndex(({ id }) => id === doc.id);
    docs.splice(idx, 1);
    dispatch({ type: actionType.LAW_UPDATE, payload: docs });
    dispatch(notifications.notify('info', 'Документ видалено'));
  } else {
    dispatch(notifications.notify('error', 'Помилка при видаленні документа'));
  }
  return;
}

export const updateDoc = (doc, file) => async (dispatch, getState) => {
  const resRemove = await storage.deleteDocument(doc.fileName);
  const { fileName, url } = await storage.addDocument(file);
  if (resRemove && fileName && url) {
    await db.updateDocument(doc.id, { fileName, url })
    const docs = [...getState().law.docs];
    const idx = docs.findIndex(({ id }) => id === doc.id);
    docs.splice(idx, 1, { ...docs[idx], fileName, url });
    dispatch({ type: actionType.LAW_UPDATE, payload: docs });
    dispatch(notifications.notify('info', 'Документ оновлено'));
  } else {
    dispatch(notifications.notify('error', 'Помилка при оновленні документа'));
  }
  return;
}
