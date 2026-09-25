import moment from 'moment';
import { isObject } from '../utils';
import { normalizePost } from '../utils/postTitle';

export const activityPostModel = {
  title: '',
  text: '',
  delta: {
    ops: []
  },
  created: '',
  images: []
};

export const formatActivityPost = (post) => {
  const shallowPost = isObject(post) ? { ...post } : { id: '', ...activityPostModel };
  return shallowPost;
};

export const genActivityPost = (rawPost) => {
  // an article pasted into the title is moved into the body
  const post = normalizePost(rawPost);
  const newPost = {};
  Object.keys(activityPostModel).forEach((key) => {
    newPost[key] = post[key] || activityPostModel[key];
  });
  newPost.created = moment().unix();
  return newPost;
};

export default class ActivityPost {
  constructor(newPost) {
    Object.keys(activityPostModel).forEach((key) => {
      this[key] = newPost[key] || activityPostModel[key];
    });
  }
}
