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
    db.collection("news").doc(id).update(post);
    logger.info('Success', 'UPDATE POST');
    return true;
  } catch(err) {
    logger.error(err, 'UPDATE POST');
    return false;
  }
}

export const deletePost = async (id) => {
  try {
    db.collection("news").doc(id).delete();
    logger.info('Success', 'DELETE POST');
    return true;
  } catch(err) {
    logger.error(err, 'DELETE POST');
    return false;
  }
}

export const getPosts = async () => {
  try {
    const querySnapshot = await db.collection("news").get();
    const res = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    logger.info(res, 'GET POSTS');
    return res;
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
      const res = {...doc.data(), id};
      return res;
    }
  } catch(err) {
    logger.error(err, 'GET POST');
    return false;
  }
}

// DOC
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
    db.collection("docs").doc(id).update(doc);
    return true;
  } catch(err) {
    logger.error(err, 'UPDATE DOC');
    return false;
  }
}

export const removeDocument = async (id) => {
  try {
    db.collection("docs").doc(id).delete();
    logger.info('success', 'REMOVE DOC');
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

// TEACHER
export const addTeacher = async (doc) => {
  try {
    const ref = await db.collection("teachers").add(doc);
    logger.info('Success', 'NEW TEACHER');
    return ref;
  } catch(err) {
    logger.error(err, 'NEW DOC');
    return false;
  }
}

export const updateTeacher = async (id, doc) => {
  try {
    db.collection("teachers").doc(id).update(doc);
    return true;
  } catch(err) {
    logger.error(err, 'UPDATE TEACHER');
    return false;
  }
}

export const removeTeacher = async (id) => {
  try {
    db.collection("teachers").doc(id).delete();
    logger.info('Success', 'REMOVE TEACHER');
    return true;
  } catch(err) {
    logger.error(err, 'REMOVE TEACHER');
    return false;
  }
}

export const getTeachers = async () => {
  try {
    const querySnapshot = await db.collection("teachers").get();
    const docs = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    logger.info(docs, 'GET TEACHERS');
    return docs;
  } catch(err) {
    logger.info(err, 'GET TEACHERS');
    return false;
  }
}
