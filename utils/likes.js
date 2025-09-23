import { logger } from '../services';

const LIKED_POSTS_KEY = 'school23_liked_posts';

/**
 * Get the list of liked post IDs from localStorage
 * @returns {string[]} Array of post IDs that have been liked
 */
export const getLikedPosts = () => {
  try {
    const likedPosts = localStorage.getItem(LIKED_POSTS_KEY);
    return likedPosts ? JSON.parse(likedPosts) : [];
  } catch (error) {
    logger.error(error, 'GET LIKED POSTS FROM LOCALSTORAGE');
    return [];
  }
};

/**
 * Check if a post has been liked by the current user
 * @param {string} postId - The ID of the post to check
 * @returns {boolean} True if the post has been liked
 */
export const isPostLiked = (postId) => {
  const likedPosts = getLikedPosts();
  return likedPosts.includes(postId);
};

/**
 * Add a post to the liked posts list
 * @param {string} postId - The ID of the post to like
 * @returns {boolean} True if successfully added, false if already liked
 */
export const likePost = (postId) => {
  try {
    const likedPosts = getLikedPosts();

    if (likedPosts.includes(postId)) {
      return false; // Already liked
    }

    likedPosts.push(postId);
    localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(likedPosts));
    return true;
  } catch (error) {
    logger.error(error, 'LIKE POST');
    return false;
  }
};

/**
 * Remove a post from the liked posts list
 * @param {string} postId - The ID of the post to unlike
 * @returns {boolean} True if successfully removed, false if not found
 */
export const unlikePost = (postId) => {
  try {
    const likedPosts = getLikedPosts();
    const index = likedPosts.indexOf(postId);

    if (index === -1) {
      return false; // Not found in liked posts
    }

    likedPosts.splice(index, 1);
    localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(likedPosts));
    return true;
  } catch (error) {
    logger.error(error, 'UNLIKE POST');
    return false;
  }
};

/**
 * Toggle the like status of a post
 * @param {string} postId - The ID of the post to toggle
 * @returns {boolean} True if post is now liked, false if now unliked
 */
export const togglePostLike = (postId) => {
  if (isPostLiked(postId)) {
    unlikePost(postId);
    return false;
  }
  likePost(postId);
  return true;
};

/**
 * Clear all liked posts (for testing or reset purposes)
 */
export const clearLikedPosts = () => {
  try {
    localStorage.removeItem(LIKED_POSTS_KEY);
  } catch (error) {
    logger.error(error, 'CLEAR LIKED POSTS');
  }
};
