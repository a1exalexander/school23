import { db } from './firebase';
import { genPost, initPost } from '../models/post';
import { logger } from '../services';
import { genPublicInfo, initPublicInfo } from '../models/publicInfo';

// Post
export const addPost = async (post) => {
  try {
    const ref = await db.collection('news').add(genPost(post));
    logger.info(ref, 'NEW POST');
    return ref;
  } catch (err) {
    logger.error(err, 'NEW POST');
    return false;
  }
};

export const updatePost = async (id, post) => {
  try {
    db.collection('news').doc(id).update(post);
    logger.info('Success', 'UPDATE POST');
    return true;
  } catch (err) {
    logger.error(err, 'UPDATE POST');
    return false;
  }
};

export const deletePost = async (id) => {
  try {
    db.collection('news').doc(id).delete();
    logger.info('Success', 'DELETE POST');
    return true;
  } catch (err) {
    logger.error(err, 'DELETE POST');
    return false;
  }
};

export const getPosts = async () => {
  try {
    const querySnapshot = await db.collection('news').get();
    const res = querySnapshot.docs.map((doc) => ({
      ...initPost,
      ...doc.data(),
      id: doc.id,
    }));
    logger.info(res, 'GET POSTS');
    return res;
  } catch (err) {
    logger.error(err, 'GET POSTS');
    return false;
  }
};

export const getPost = async (id) => {
  try {
    const doc = await db.collection('news').doc(id).get();
    if (!doc.exists) {
      return false;
    } else {
      const res = { ...initPost, ...doc.data(), id };
      return res;
    }
  } catch (err) {
    logger.error(err, 'GET POST');
    return false;
  }
};

// Post
export const addPublicInfo = async (post) => {
  try {
    const ref = await db.collection('publicInfo').add(genPublicInfo(post));
    logger.info(ref, 'NEW PUBLIC INFO');
    return ref;
  } catch (err) {
    logger.error(err, 'NEW PUBLIC INFO');
    return false;
  }
};

export const updatePublicInfo = async (id, post) => {
  try {
    db.collection('publicInfo').doc(id).update(post);
    logger.info('Success', 'UPDATE PUBLIC INFO');
    return true;
  } catch (err) {
    logger.error(err, 'UPDATE PUBLIC INFO');
    return false;
  }
};

export const deletePublicInfo = async (id) => {
  try {
    db.collection('publicInfo').doc(id).delete();
    logger.info('Success', 'DELETE PUBLIC INFO');
    return true;
  } catch (err) {
    logger.error(err, 'DELETE PUBLIC INFO');
    return false;
  }
};

export const getAllPublicInfo = async () => {
  try {
    const querySnapshot = await db.collection('publicInfo').get();
    const res = querySnapshot.docs.map((doc) => ({
      ...initPublicInfo,
      ...doc.data(),
      id: doc.id,
    }));
    logger.info(res, 'GET PUBLIC INFO');
    return res;
  } catch (err) {
    logger.error(err, 'GET PUBLIC INFO');
    return false;
  }
};

export const getPublicInfo = async (id) => {
  try {
    const doc = await db.collection('publicInfo').doc(id).get();
    if (!doc.exists) {
      return false;
    } else {
      const res = { ...initPublicInfo, ...doc.data(), id };
      return res;
    }
  } catch (err) {
    logger.error(err, 'GET PUBLIC INFO');
    return false;
  }
};
