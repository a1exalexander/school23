import moment from 'moment';
import { isObject } from '../utils';
import uuid from 'uuid';

export const initPost = {
  title: '',
  text: '',
  type: '',
  delta: {
    ops: []
  },
  created: '',
  comments: [],
};

export const getReply = ({ targetName = '', target = '', name = '', text = '' } = {}) => ({
  id: uuid(),
  target,
  targetName,
  name,
  text,
  date: moment().format('DD.MM.YYYY HH:mm:ss'),
})

export const getComment = ({name = '', text = ''} = {}) => ({
  id: uuid(),
  name,
  text,
  date: moment().format('DD.MM.YYYY HH:mm:ss'),
  reply: [],
});

export const formatPost = post => {
  const shallowPost = isObject(post) ? { ...post } : { id: '', ...initPost };
  return shallowPost;
};

export const genPost = post => {
  const newPost = {};
  Object.keys(initPost).forEach(key => {
    newPost[key] = post[key] || initPost[key];
  });
  newPost.created = moment().unix();
  return newPost;
};

export default class Post {
  constructor(newPost) {
    Object.keys(post).forEach(key => {
      this[key] = newPost[key] || initPost[key];
    });
  }
}
