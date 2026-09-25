import moment from 'moment';
import { isObject } from '../utils';
import { normalizePost } from '../utils/postTitle';

export const publicInfoModel = {
  title: '',
  text: '',
  delta: {
    ops: []
  },
  created: '',
  images: [],
  iframe: '',
  video: ''
};

export const formatPublicIbfo = (post) => {
  const shallowPost = isObject(post) ? { ...post } : { id: '', ...publicInfoModel };
  return shallowPost;
};

export const genPublicInfo = (rawPost) => {
  // an article pasted into the title is moved into the body
  const post = normalizePost(rawPost);
  const newPost = {};
  Object.keys(publicInfoModel).forEach((key) => {
    newPost[key] = post[key] || publicInfoModel[key];
  });
  newPost.created = moment().unix();
  return newPost;
};

export default class PublicInfo {
  constructor(newPost) {
    Object.keys(publicInfoModel).forEach((key) => {
      this[key] = newPost[key] || publicInfoModel[key];
    });
  }
}
