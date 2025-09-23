import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { isPostLiked, togglePostLike } from '../../utils/likes';
import { incrementPostLikes, decrementPostLikes } from '../../firebase/db';
import { updatePostLikes } from '../../store/modules/news/actions';

const LikeButton = ({ post, onLikesChange, className = '', showCount = true }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (post?.id) {
      setLiked(isPostLiked(post.id));
      // Ensure likes count defaults to 0 if undefined
      setLikesCount(typeof post.likes === 'number' ? post.likes : 0);
    }
  }, [post]);

  const handleLikeToggle = async () => {
    if (!post?.id || isLoading) return;

    setIsLoading(true);

    try {
      const newLikedState = togglePostLike(post.id);
      setLiked(newLikedState);

      // Update Firestore
      if (newLikedState) {
        const success = await incrementPostLikes(post.id);
        if (success) {
          const newCount = likesCount + 1;
          setLikesCount(newCount);
          onLikesChange?.(newCount);
          // Update Redux cache
          dispatch(updatePostLikes(post.id, newCount));
        } else {
          // Revert local state if Firestore update failed
          togglePostLike(post.id);
          setLiked(!newLikedState);
        }
      } else {
        const success = await decrementPostLikes(post.id);
        if (success) {
          const newCount = Math.max(0, likesCount - 1);
          setLikesCount(newCount);
          onLikesChange?.(newCount);
          // Update Redux cache
          dispatch(updatePostLikes(post.id, newCount));
        } else {
          // Revert local state if Firestore update failed
          togglePostLike(post.id);
          setLiked(!newLikedState);
        }
      }
    } catch (error) {
      // Revert local state on error
      togglePostLike(post.id);
      setLiked(!liked);
    }

    setIsLoading(false);
  };

  return (
    <button
      type="button"
      onClick={handleLikeToggle}
      disabled={isLoading}
      className={`like-button ${liked ? 'like-button--active' : ''} ${className}`}
      aria-label={liked ? 'Unlike this post' : 'Like this post'}
    >
      <svg
        className="like-button__icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={liked ? '#e91e63' : 'none'}
        stroke={liked ? '#e91e63' : 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {showCount && <span className="like-button__count">{likesCount}</span>}
    </button>
  );
};

LikeButton.defaultProps = {
  onLikesChange: null,
  className: '',
  showCount: true
};

LikeButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    likes: PropTypes.number
  }).isRequired,
  onLikesChange: PropTypes.func,
  className: PropTypes.string,
  showCount: PropTypes.bool
};

export default LikeButton;
