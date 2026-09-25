import React, { useEffect, useMemo } from 'react';
import moment from 'moment';
import { arrayOf, instanceOf, object, oneOfType, shape, string } from 'prop-types';
import SBadge from '../../common/SBadge';
import { SGallery } from '../../common/media/SGallery';
import { SEditorPreview } from '../../common/SEditorPreview';
import { CanteenCard } from '../canteen/CanteenCard';

const SECTION_BADGE = {
  page: { label: 'Публічна інформація', color: 'cyan' },
  activity: { label: 'Діяльність гімназії', color: 'cyan' }
};

const getBadge = (type, postType) => {
  if (type === 'post') {
    return postType === 'announcement'
      ? { label: 'Оголошення', color: 'red' }
      : { label: 'Стаття', color: 'blue' };
  }
  return SECTION_BADGE[type] || null;
};

/**
 * Shows an entry the way visitors will see it, before it gets published.
 * `images` are photos already on the site, `files` are FilePond items that are not uploaded yet.
 */
export const AdminPostPreview = ({ type, post, images, files }) => {
  const localImages = useMemo(
    () =>
      (files || [])
        .filter((item) => item?.file instanceof Blob)
        .map((item) => ({ id: item.id, src: URL.createObjectURL(item.file) })),
    [files]
  );

  useEffect(() => () => localImages.forEach(({ src }) => URL.revokeObjectURL(src)), [localImages]);

  const allImages = [...(images || []), ...localImages];

  if (type === 'canteen') {
    return (
      <div className="admin-preview _canteen">
        <CanteenCard item={{ id: 'preview', ...post, images: allImages }} />
      </div>
    );
  }

  const badge = getBadge(type, post.type);
  const created = post.created ? moment(post.created * 1000) : moment();
  const isDeltaEmpty = !post.delta?.ops?.length;

  return (
    <article className="admin-preview post__article">
      <header className="post__header">
        <div className="post__meta">
          {badge && <SBadge color={badge.color} label={badge.label} />}
          <time className="post__date">{created.format('D MMMM YYYY')}</time>
        </div>
        <h1 className="post__title">{post.title || 'Без заголовка'}</h1>
      </header>
      {!!allImages.length && (
        <SGallery className="post__gallery" images={allImages} alt={post.title} />
      )}
      {!!post.video && (
        <p className="admin-preview__note">
          Тут буде відео з Facebook — воно зʼявиться на сайті після публікації.
        </p>
      )}
      {!!post.text?.trim() && (
        <SEditorPreview
          className="post__content"
          content={isDeltaEmpty ? post.text : post.delta}
          postType={post.type}
        />
      )}
    </article>
  );
};

AdminPostPreview.defaultProps = {
  type: 'post',
  images: [],
  files: []
};

AdminPostPreview.propTypes = {
  type: string,
  post: shape({
    title: string,
    text: string,
    type: string,
    video: string,
    delta: shape({ ops: arrayOf(oneOfType([object, string])) }),
    date: oneOfType([instanceOf(Date), object])
  }).isRequired,
  images: arrayOf(shape({ id: string, src: string })),
  files: arrayOf(shape({ id: string, file: instanceOf(Blob) }))
};

export default AdminPostPreview;
