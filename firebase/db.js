import { db } from './firebase';
import { genPost, postModel } from '../models/post';
import { genPublicInfo, publicInfoModel } from '../models/publicInfo';
import { activityPostModel, genActivityPost } from '../models/activity';
import { logger } from '../services';
import { foodModel, genFood } from '../models/food';
import { isObject } from '../utils';
import { clockModel } from '../models/clock';
import { ITEMS_PER_PAGE } from '../constants';

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

export const getPosts = async (currentPage = 1, itemsPerPage = ITEMS_PER_PAGE) => {
  try {
    const query = db
      .collection('news')
      .orderBy('created', 'desc')
      .limit(currentPage * itemsPerPage);

    const querySnapshot = await query.get();
    const res = querySnapshot.docs.map((doc) => ({
      ...postModel,
      ...doc.data(),
      id: doc.id
    }));
    logger.info(res, 'GET POSTS');
    return {
      posts: arrayWithFilteredImages(res),
      lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1]
    };
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

// Public Post
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

// Activity Post

export const addActivityPost = async (post) => {
  try {
    const ref = await db.collection('activity').add(genActivityPost(post));
    logger.info(ref, 'NEW ACTIVITY POST');
    return ref;
  } catch (err) {
    logger.error(err, 'NEW ACTIVITY POST');
    return false;
  }
};

export const updateActivityPost = async (id, post) => {
  try {
    db.collection('activity').doc(id).update(post);
    logger.info('Success', 'UPDATE ACTIVITY POST');
    return true;
  } catch (err) {
    logger.error(err, 'UPDATE ACTIVITY POST');
    return false;
  }
};

export const deleteActivityPost = async (id) => {
  try {
    db.collection('activity').doc(id).delete();
    logger.info('Success', 'DELETE ACTIVITY POST');
    return true;
  } catch (err) {
    logger.error(err, 'DELETE ACTIVITY POST');
    return false;
  }
};

export const getAllActivityPosts = async () => {
  try {
    const querySnapshot = await db.collection('activity').get();
    const res = querySnapshot.docs.map((doc) => ({
      ...activityPostModel,
      ...doc.data(),
      id: doc.id
    }));
    logger.info(res, 'GET ACTIVITY POST');
    return arrayWithFilteredImages(res);
  } catch (err) {
    logger.error(err, 'GET ACTIVITY POST');
    return false;
  }
};

export const getActivityPost = async (id) => {
  try {
    const doc = await db.collection('activity').doc(id).get();
    if (!doc.exists) {
      return false;
    }
    const res = { ...activityPostModel, ...doc.data(), id };
    return objectWithFilteredImages(res);
  } catch (err) {
    logger.error(err, 'GET ACTIVITY POST');
    return false;
  }
};

// Food
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

// Clock

export const getClock = async () => {
  try {
    const doc = await db.collection('clock').doc('time').get();
    if (!doc.exists) {
      return false;
    }
    const res = { ...clockModel, ...doc.data() };
    return res;
  } catch (err) {
    logger.error(err, 'GET CLOCK');
    return false;
  }
};

export const saveClock = async (data) => {
  try {
    db.collection('clock').doc('time').update(data);
    logger.info('Success', 'UPDATE CLOCK');
    return true;
  } catch (err) {
    logger.error(err, 'UPDATE CLOCK');
    return false;
  }
};
