import { storage } from './firebase';
import { logger } from '../services';
import { messages } from '../constants';
import {
  getImageTooLargeMessage,
  isFileSizeError,
  isFileTooLarge,
  isNetworkError
} from '../utils/file';

export const UPLOAD_ERROR_TOO_LARGE = 'file-too-large';

/**
 * An upload error that already carries a message ready to be shown to a user
 */
export class UploadError extends Error {
  constructor(message, code = 'upload/failed') {
    super(message);
    this.name = 'UploadError';
    this.code = code;
  }
}

/**
 * Turn a Firebase Storage error into a friendly Ukrainian message.
 * Storage rules reject images heavier than 2 MB with `storage/unauthorized`,
 * so that is by far the most common reason of a failed upload in the admin.
 * @param {Error|Object} error
 * @returns {UploadError}
 */
const toUploadError = (error) => {
  if (error instanceof UploadError) return error;
  if (isFileSizeError(error)) {
    return new UploadError(messages.IMAGE_UPLOAD_FORBIDDEN, UPLOAD_ERROR_TOO_LARGE);
  }
  if (isNetworkError(error)) {
    return new UploadError(messages.IMAGE_UPLOAD_NETWORK, error?.code);
  }
  return new UploadError(messages.IMAGE_UPLOAD_ERROR, error?.code);
};

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
  if (isFileTooLarge(file)) {
    const error = new UploadError(getImageTooLargeMessage([file]), UPLOAD_ERROR_TOO_LARGE);
    logger.error(error, 'ADD IMAGE');
    throw error;
  }
  try {
    await storage.ref().child(`images/${filenameWithoutExtension}`).put(file);
    const src = await storage.ref().child(`images/${filenameWithoutExtension}`).getDownloadURL();
    logger.log(src, 'ADD IMAGE');
    return { id, filenameWithoutExtension, src };
  } catch (err) {
    logger.error(err, 'ADD IMAGE');
    throw toUploadError(err);
  }
};
