import { db } from './firebase';
import { genPost } from '../models/post';
import { logger } from '../services';

// Post
export const addPost = async (post) => {
  try {
    const ref = await db.collection("news").add(genPost(post));
    logger.info(ref, 'NEW POST');
    return ref;
  } catch(err) {
    logger.error(err, 'NEW POST');
    return false;
  }
}

export const updatePost = async (id, post) => {
  try {
    const ref = await db.collection("news").doc(id).update(post);
    logger.info(ref, 'UPDATE POST');
    return ref;
  } catch(err) {
    logger.error(err, 'UPDATE POST');
    return false;
  }
}

export const removePost = async (id) => {
  try {
    const ref = await db.collection("news").doc(id).delete();
    logger.info(ref, 'REMOVE POST');
    return ref;
  } catch(err) {
    logger.error(err, 'REMOVE POST');
    return false;
  }
}

export const getPosts = async () => {
  try {
    const querySnapshot = await db.collection("news").get();
    logger.info(querySnapshot, 'GET POSTS');
    return querySnapshot;
  } catch(err) {
    logger.error(err, 'GET POSTS');
    return false;
  }
}

export const getPost = async (id) => {
  try {
    const doc = await db.collection("news").doc(id).get();
    if (!doc.exists) {
      return false;
    } else {
      const res = doc.data();
      return res;
    }
  } catch(err) {
    logger.error(err, 'GET POST');
    return false;
  }
}

// Post
export const addDocument = async (doc) => {
  try {
    const ref = await db.collection("docs").add(doc);
    logger.info(ref, 'NEW DOC');
    return ref;
  } catch(err) {
    logger.error(err, 'NEW DOC');
    return false;
  }
}

export const updateDocument = async (id, doc) => {
  try {
    const ref = await db.collection("docs").doc(id).update(doc);
    logger.info(ref, 'UPDATE DOC');
    return ref;
  } catch(err) {
    logger.error(err, 'UPDATE DOC');
    return false;
  }
}

export const removeDocument = async (id) => {
  try {
    const ref = await db.collection("docs").doc(id).delete();
    logger.info(ref, 'REMOVE DOC');
    return true;
  } catch(err) {
    logger.error(err, 'REMOVE DOC');
    return false;
  }
}

export const getDocuments = async () => {
  try {
    const querySnapshot = await db.collection("docs").get();
    const docs = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    logger.info(docs, 'GET DOCS');
    return docs;
  } catch(err) {
    logger.info(err, 'GET DOCS');
    return false;
  }
}

export const getDocument = async (id) => {
  try {
    const doc = await db.collection("docs").doc(id).get();
    if (!doc.exists) {
      return false;
    } else {
      const res = doc.data();
      logger.info(res, 'GET DOC');
      return res;
    }
  } catch(err) {
    logger.info(err, 'GET DOC');
    return false;
  }
}
