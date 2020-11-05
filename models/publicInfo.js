import moment from 'moment';
import { isObject } from '../utils';

export const initPublicInfo = {
  title: '',
  text: '',
  delta: {
    ops: [],
  },
  created: '',
};

export const formatPublicIbfo = (post) => {
  const shallowPost = isObject(post) ? { ...post } : { id: '', ...initPublicInfo };
  return shallowPost;
};

export const genPublicInfo = (post) => {
  const newPost = {};
  Object.keys(initPublicInfo).forEach((key) => {
    newPost[key] = post[key] || initPublicInfo[key];
  });
  newPost.created = moment().unix();
  return newPost;
};

export default class PublicInfo {
  constructor(newPost) {
    Object.keys(post).forEach((key) => {
      this[key] = newPost[key] || initPublicInfo[key];
    });
  }
}
