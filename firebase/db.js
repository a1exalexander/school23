import { db } from './firebase';
import { genPost, postModel } from '../models/post';
import { genPublicInfo, publicInfoModel } from '../models/publicInfo';
import { logger } from '../services';
import { foodModel, genFood } from '../models/food';
import { isObject } from '../utils';

const arrayWithFilteredImages = (data) => {
  return (data || []).map((item) => {
    return { ...item, images: item?.images.filter((image) => isObject(image)) };
  });
};

const objectWithFilteredImages = (data) => ({
  ...data,
  images: (data?.images || []).filter((image) => isObject(image))
});

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
      ...postModel,
      ...doc.data(),
      id: doc.id
    }));
    logger.info(res, 'GET POSTS');
    return arrayWithFilteredImages(res);
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
    }
    const res = { ...postModel, ...doc.data(), id };
    return objectWithFilteredImages(res);
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
      ...publicInfoModel,
      ...doc.data(),
      id: doc.id
    }));
    logger.info(res, 'GET PUBLIC INFO');
    return arrayWithFilteredImages(res);
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
    }
    const res = { ...publicInfoModel, ...doc.data(), id };
    return objectWithFilteredImages(res);
  } catch (err) {
    logger.error(err, 'GET PUBLIC INFO');
    return false;
  }
};

// Post
export const addFood = async (post) => {
  try {
    const ref = await db.collection('food').add(genFood(post));
    logger.info(ref, 'NEW FOOD');
    return ref;
  } catch (err) {
    logger.error(err, 'NEW FOOD');
    return false;
  }
};

export const deleteFood = async (id) => {
  try {
    db.collection('food').doc(id).delete();
    logger.info('Success', 'DELETE FOOD');
    return true;
  } catch (err) {
    logger.error(err, 'DELETE FOOD');
    return false;
  }
};

export const getFood = async () => {
  try {
    const querySnapshot = await db.collection('food').get();
    const res = querySnapshot.docs.map((doc) => ({
      ...foodModel,
      ...doc.data(),
      id: doc.id
    }));
    logger.info(res, 'GET FOOD');
    return arrayWithFilteredImages(res);
  } catch (err) {
    logger.error(err, 'GET FOOD');
    return false;
  }
};
