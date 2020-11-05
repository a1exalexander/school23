import { storage } from './firebase';
import { logger } from '../services';

const getUrl = async (file) => {
  file.getDownloadURL();
};

export const addDocument = async (file, name) => {
  try {
    const fileName = name || file.name;
    const url = await storage.ref().child(`docs/${fileName}`).getDownloadURL();
    logger.log(url, 'ADD DOC');
    return { fileName, url };
  } catch (err) {
    logger.error(err, 'ADD DOC');
    return false;
  }
};

export const deleteDocument = async (fileName) => {
  try {
    const res = await storage.ref().child(`docs/${fileName}`).delete();
    logger.log(res, 'DELETE DOC');
    return true;
  } catch (err) {
    logger.error(err, 'DELETE DOC');
    return false;
  }
};

export const getDocuments = async () => {
  try {
    const res = await storage.ref().child('docs').listAll();
    const files = await Promise.all(res.items.map((file) => getUrl(file)));
    return files;
  } catch (err) {
    logger.error(err, 'GET DOC');
    return false;
  }
};

export const addPhotoTeacher = async (file, name) => {
  try {
    const fileName = name || file.name;
    const url = await storage.ref().child(`teachers/${fileName}`).getDownloadURL();
    logger.log(url, 'ADD PHOTO');
    return { fileName, url };
  } catch (err) {
    logger.error(err, 'ADD PHOTO');
    return false;
  }
};

export const deletePhotoTeacher = async (fileName) => {
  try {
    const res = await storage.ref().child(`teachers/${fileName}`).delete();
    logger.log(res, 'DELETE PHOTO');
    return true;
  } catch (err) {
    logger.error(err, 'DELETE PHOTO');
    return false;
  }
};

export const addPostImage = async ({ file, id, filenameWithoutExtension }) => {
  try {
    await storage.ref().child(`images/${filenameWithoutExtension}`).put(file);
    const src = await storage.ref().child(`images/${filenameWithoutExtension}`).getDownloadURL();
    logger.log(src, 'ADD IMAGE');
    return { id, filenameWithoutExtension, src };
  } catch (err) {
    logger.error(err, 'ADD IMAGE');
    return false;
  }
};
