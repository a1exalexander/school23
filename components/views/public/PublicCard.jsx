import React from 'react';
import { number, oneOfType, shape, string } from 'prop-types';
import { EntryCard } from '../../common/cards/EntryCard';
import { routes } from '../../../constants';

export const PublicCard = ({ post, className }) => (
  <EntryCard
    post={post}
    className={className}
    href={{ pathname: routes.PUBLIC_INFO_POST, query: { pid: post.id } }}
  />
);

PublicCard.defaultProps = {
  className: ''
};

PublicCard.propTypes = {
  className: string,
  post: shape({
    id: oneOfType([number, string]),
    title: string,
    text: string,
    created: oneOfType([number, string])
  }).isRequired
};

export default PublicCard;
