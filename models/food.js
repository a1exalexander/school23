import moment from 'moment';
import { isObject } from '../utils';

export const foodModel = {
  title: '',
  created: '',
  images: [],
  date: ''
};

export const formatFood = (post) => {
  const shallowPost = isObject(post) ? { ...post } : { id: '', ...foodModel };
  return shallowPost;
};

export const genFood = (post) => {
  const newPost = {};
  Object.keys(foodModel).forEach((key) => {
    newPost[key] = post[key] || foodModel[key];
  });
  newPost.created = moment().unix();
  return newPost;
};

export default class Food {
  constructor(newPost) {
    Object.keys(foodModel).forEach((key) => {
      this[key] = newPost[key] || foodModel[key];
    });
  }
}
