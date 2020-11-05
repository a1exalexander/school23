import moment from 'moment';
import { isObject } from '../utils';

export const publicInfoModel = {
  title: '',
  text: '',
  delta: {
    ops: [],
  },
  created: '',
};

export const formatPublicIbfo = (post) => {
  const shallowPost = isObject(post) ? { ...post } : { id: '', ...publicInfoModel };
  return shallowPost;
};

export const genPublicInfo = (post) => {
  const newPost = {};
  Object.keys(publicInfoModel).forEach((key) => {
    newPost[key] = post[key] || publicInfoModel[key];
  });
  newPost.created = moment().unix();
  return newPost;
};

export default class PublicInfo {
  constructor(newPost) {
    Object.keys(post).forEach((key) => {
      this[key] = newPost[key] || publicInfoModel[key];
    });
  }
}
