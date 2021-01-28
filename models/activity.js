import moment from 'moment';
import { isObject } from '../utils';

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

export const genActivityPost = (post) => {
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
