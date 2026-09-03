const IMG_SRC_RE = /<img[^>]*\ssrc\s*=\s*["']([^"']+)["'][^>]*>/i;
const TAG_RE = /<[^>]*>/g;
const IMG_TAG_RE = /<img[^>]*>/gi;

/**
 * Returns the URL of the preview image for a post: the first uploaded
 * image, or the first <img> found in the rich-text body. Returns null
 * when the post has no picture at all.
 */
export const getPreviewImage = (post) => {
  const uploaded = post?.images?.[0];
  if (uploaded) {
    return typeof uploaded === 'string' ? uploaded : uploaded.src || null;
  }
  const match = typeof post?.text === 'string' ? post.text.match(IMG_SRC_RE) : null;
  return match ? match[1] : null;
};

/**
 * Plain-text excerpt of a rich-text body (tags removed, whitespace collapsed).
 */
export const getExcerpt = (html, length = 200) => {
  if (!html) return '';
  const text = String(html)
    .replace(IMG_TAG_RE, '')
    .replace(TAG_RE, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= length) return text;
  const cut = text.slice(0, length);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : length)}…`;
};

export default getPreviewImage;
