import moment from 'moment';
import { isObject } from '../utils';

export const initPost = {
  title: '',
  text: '',
  type: '',
  delta: {
    ops: [],
  },
  created: '',
};

export const formatPost = (post) => {
  const shallowPost = isObject(post) ? { ...post } : { id: '', ...initPost };
  return shallowPost;
};

export const genPost = (post) => {
  const newPost = {};
  Object.keys(initPost).forEach((key) => {
    newPost[key] = post[key] || initPost[key];
  });
  newPost.created = moment().unix();
  return newPost;
};

export default class Post {
  constructor(newPost) {
    Object.keys(post).forEach((key) => {
      this[key] = newPost[key] || initPost[key];
    });
  }
}
