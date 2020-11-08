import moment from 'moment';
import { isObject } from '../utils';

export const postModel = {
  title: '',
  text: '',
  type: '',
  delta: {
    ops: []
  },
  created: '',
  images: [],
  iframe: ''
};

export const formatPost = (post) => {
  const shallowPost = isObject(post) ? { ...post } : { id: '', ...postModel };
  return shallowPost;
};

export const genPost = (post) => {
  const newPost = {};
  Object.keys(postModel).forEach((key) => {
    newPost[key] = post[key] || postModel[key];
  });
  newPost.created = moment().unix();
  return newPost;
};

export default class Post {
  constructor(newPost) {
    Object.keys(post).forEach((key) => {
      this[key] = newPost[key] || postModel[key];
    });
  }
}
