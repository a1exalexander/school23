import moment from 'moment';

const initPost = {
  title: '',
  text: '',
  type: '',
  created: '',
}

export const genPost = (post) => {
  const newPost = {};
  Object.keys(initPost).forEach(key => {
    newPost[key] = post[key] || initPost[key];
  });
  newPost.created = moment().unix();
  return newPost;
}

export default class Post {
  constructor(newPost) {
    Object.keys(post).forEach(key => {
      this[key] = newPost[key] || initPost[key];
    });
  }
}
