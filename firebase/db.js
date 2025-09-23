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

// Counter functions
export const getPostsCount = async () => {
  try {
    const doc = await db.collection('metadata').doc('counters').get();
    if (!doc.exists) {
      logger.error('Posts counter not found', 'GET POSTS COUNT');
      return 0;
    }
    const data = doc.data();
    return data.postsCount || 0;
  } catch (err) {
    logger.error(err, 'GET POSTS COUNT');
    return 0;
  }
};

const updatePostsCount = async (increment = true) => {
  try {
    const counterRef = db.collection('metadata').doc('counters');
    const doc = await counterRef.get();

    if (!doc.exists) {
      logger.error('Posts counter not found for update', 'UPDATE POSTS COUNT');
      return;
    }

    const currentCount = doc.data().postsCount || 0;
    const newCount = increment ? currentCount + 1 : Math.max(0, currentCount - 1);
    await counterRef.update({ postsCount: newCount });
  } catch (err) {
    logger.error(err, 'UPDATE POSTS COUNT');
  }
};

// Post
export const addPost = async (post) => {
  try {
    const ref = await db.collection('news').add(genPost(post));
    await updatePostsCount(true); // Increment counter
    logger.info(ref.id, 'NEW POST');
    return ref;
  } catch (err) {
    logger.error(err, 'NEW POST');
    return false;
  }
};

export const updatePost = async (id, post) => {
  try {
    await db.collection('news').doc(id).update(genPost(post));
    logger.info('Success', 'UPDATE POST');
    return true;
  } catch (err) {
    logger.error(err, 'UPDATE POST');
    return false;
  }
};

export const deletePost = async (id) => {
  try {
    await db.collection('news').doc(id).delete();
    await updatePostsCount(false); // Decrement counter
    logger.info('Success', 'DELETE POST');
    return true;
  } catch (err) {
    logger.error(err, 'DELETE POST');
    return false;
  }
};

// Cache for cursor positions to enable efficient pagination
const pageCursorCache = new Map();

export const getPosts = async (
  currentPage = 1,
  itemsPerPage = ITEMS_PER_PAGE,
  searchQuery = ''
) => {
  try {
    let query = db.collection('news').orderBy('created', 'desc');

    if (searchQuery) {
      const tokens = searchQuery.split(/\s+/).map((word) => word.toLowerCase());
      query = db
        .collection('news')
        .where('titleTokens', 'array-contains-any', tokens)
        .orderBy('created', 'desc');

      // For search queries, use simple pagination (less critical for performance)
      const querySnapshot = await query.limit(itemsPerPage * currentPage).get();
      const allResults = querySnapshot.docs.map((doc) => ({
        ...postModel,
        ...doc.data(),
        id: doc.id
      }));

      const startIndex = (currentPage - 1) * itemsPerPage;
      const pageResults = allResults.slice(startIndex, startIndex + itemsPerPage);

      logger.info(`Search Page ${currentPage}: ${pageResults?.length} posts`, 'GET POSTS');
      return {
        posts: arrayWithFilteredImages(pageResults),
        lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1] || null
      };
    }

    // Efficient cursor-based pagination for regular posts
    if (currentPage === 1) {
      // First page - simple query
      const querySnapshot = await query.limit(itemsPerPage).get();
      const results = querySnapshot.docs.map((doc) => ({
        ...postModel,
        ...doc.data(),
        id: doc.id
      }));

      // Cache the last document for next page
      if (querySnapshot.docs.length > 0) {
        pageCursorCache.set(2, querySnapshot.docs[querySnapshot.docs.length - 1]);
      }

      logger.info(`Page ${currentPage}: ${results?.length} posts (cursor-based)`, 'GET POSTS');
      return {
        posts: arrayWithFilteredImages(results),
        lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1] || null
      };
    }

    // For pages > 1, try to use cached cursor or build cursor chain
    let startAfterDoc = pageCursorCache.get(currentPage);

    if (!startAfterDoc) {
      // Build cursor by fetching from page 1 up to current page
      // This is more efficient than fetching all posts at once
      const tempQuery = query;
      let lastDoc = null;

      for (let page = 1; page < currentPage; page += 1) {
        // eslint-disable-next-line no-await-in-loop
        const tempSnapshot = await (lastDoc
          ? tempQuery.startAfter(lastDoc).limit(itemsPerPage)
          : tempQuery.limit(itemsPerPage)
        ).get();

        if (tempSnapshot.docs.length === 0) {
          // No more posts available
          return {
            posts: [],
            lastVisible: null
          };
        }

        lastDoc = tempSnapshot.docs[tempSnapshot.docs.length - 1];

        // Cache this cursor for future use
        if (page + 1 <= currentPage) {
          pageCursorCache.set(page + 1, lastDoc);
        }
      }

      startAfterDoc = lastDoc;
    }

    // Fetch the actual page data
    const querySnapshot = await (startAfterDoc
      ? query.startAfter(startAfterDoc).limit(itemsPerPage)
      : query.limit(itemsPerPage)
    ).get();

    const results = querySnapshot.docs.map((doc) => ({
      ...postModel,
      ...doc.data(),
      id: doc.id
    }));

    // Cache cursor for next page
    if (querySnapshot.docs.length > 0) {
      pageCursorCache.set(currentPage + 1, querySnapshot.docs[querySnapshot.docs.length - 1]);
    }

    logger.info(`Page ${currentPage}: ${results?.length} posts (cursor-based)`, 'GET POSTS');
    return {
      posts: arrayWithFilteredImages(results),
      lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1] || null
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

export const incrementPostLikes = async (postId) => {
  try {
    const postRef = db.collection('news').doc(postId);

    // Use Firestore transaction for atomic increment
    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(postRef);

      if (!doc.exists) {
        throw new Error('Post not found for like increment');
      }

      const currentLikes = doc.data().likes || 0;
      transaction.update(postRef, { likes: currentLikes + 1 });
    });

    logger.info(`Post ${postId} likes incremented`, 'INCREMENT POST LIKES');
    return true;
  } catch (err) {
    logger.error(err, 'INCREMENT POST LIKES');
    return false;
  }
};

export const decrementPostLikes = async (postId) => {
  try {
    const postRef = db.collection('news').doc(postId);

    // Use Firestore transaction for atomic decrement
    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(postRef);

      if (!doc.exists) {
        throw new Error('Post not found for like decrement');
      }

      const currentLikes = doc.data().likes || 0;
      const newLikes = Math.max(0, currentLikes - 1); // Prevent negative likes
      transaction.update(postRef, { likes: newLikes });
    });

    logger.info(`Post ${postId} likes decremented`, 'DECREMENT POST LIKES');
    return true;
  } catch (err) {
    logger.error(err, 'DECREMENT POST LIKES');
    return false;
  }
};

// Public Post
export const addPublicInfo = async (post) => {
  try {
    const ref = await db.collection('publicInfo').add(genPublicInfo(post));
    logger.info(ref.id, 'NEW PUBLIC INFO');
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
    logger.info(res?.length, 'GET PUBLIC INFO');
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
    logger.info(ref.id, 'NEW ACTIVITY POST');
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
    logger.info(res?.length, 'GET ACTIVITY POST');
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
    logger.info(ref.id, 'NEW FOOD');
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
    logger.info(res?.length, 'GET FOOD');
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
