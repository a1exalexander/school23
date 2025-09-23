import moment from 'moment';
import { isObject } from '../utils';
import generateTokens from '../utils/generateTokens';

export const postModel = {
  title: '',
  titleTokens: [],
  text: '',
  type: '',
  delta: {
    ops: []
  },
  created: '',
  images: [],
  video: '',
  iframe: '',
  likes: 0
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
  newPost.titleTokens = generateTokens(newPost.title);
  newPost.created = moment().unix();
  return { ...post, ...newPost };
};

export default class Post {
  constructor(newPost) {
    Object.keys(postModel).forEach((key) => {
      this[key] = newPost[key] || postModel[key];
    });
  }
}
