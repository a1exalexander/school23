import React from 'react';
import { number, oneOfType, shape, string } from 'prop-types';
import { EntryCard } from '../../common/cards/EntryCard';
import { routes } from '../../../constants';

export const ActivityCard = ({ post, className }) => (
  <EntryCard
    post={post}
    className={className}
    href={{ pathname: routes.ACTIVITY_POST, query: { aid: post.id } }}
  />
);

ActivityCard.defaultProps = {
  className: ''
};

ActivityCard.propTypes = {
  className: string,
  post: shape({
    id: oneOfType([number, string]),
    title: string,
    text: string,
    created: oneOfType([number, string])
  }).isRequired
};

export default ActivityCard;
