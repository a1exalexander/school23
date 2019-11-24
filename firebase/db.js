import { db } from './firebase';
import { genPost } from '../models/post';

// Post
export const addPost = async (post) => {
  try {
    const ref = await db.collection("news").add(genPost(post))
    console.log(ref);
    return ref;
  } catch(err) {
    console.log(err);
    return false;
  }
}

export const updatePost = async (id, post) => {
  try {
    const ref = await db.collection("news").doc(id).update(post)
    console.log(ref);
    return ref;
  } catch(err) {
    console.log(err);
    return false;
  }
}

export const removePost = async (id) => {
  try {
    const ref = await db.collection("news").doc(id).delete()
    console.log(ref);
    return ref;
  } catch(err) {
    console.log(err);
    return false;
  }
}

export const getPosts = async () => {
  try {
    const querySnapshot = await db.collection("news").get();
    return querySnapshot;
  } catch(err) {
    console.log(err);
    return false;
  }
}
