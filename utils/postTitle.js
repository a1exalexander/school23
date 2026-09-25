/**
 * Editors sometimes paste the whole article into the title field and leave the body empty.
 * These helpers move such text into the body and give the post a short title made
 * of its first words. News cards hide such a title, since the body already starts with it.
 */

/** A title is a short line; anything longer belongs in the body */
export const TITLE_MAX_LENGTH = 150;

/** Length of a title made from the first words of the body */
export const AUTO_TITLE_LENGTH = 80;

const ELLIPSIS = '…';
const TAG_RE = /<[^>]*>/g;
const TRAILING_DOTS_RE = /(\.{3}|…)$/;
const WORD_CHAR_RE = /[\p{L}\p{N}]/u;

const collapse = (value) =>
  String(value || '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Plain text of a post body (it is plain text from the editor, but old posts keep HTML) */
export const getPlainText = (text) =>
  collapse(
    String(text || '')
      .replace(/<\/(p|div|h[1-6]|li|blockquote)>|<br\s*\/?>/gi, ' ')
      .replace(TAG_RE, '')
  );

const hasDeltaText = (delta) =>
  (delta?.ops || []).some((op) => typeof op?.insert === 'string' && op.insert.trim());

/** True when the body has no words (photos inside the body don't count as text) */
export const isBodyEmpty = (post) => !getPlainText(post?.text) && !hasDeltaText(post?.delta);

/** The article ended up in the title: the title is too long and the body has no text */
export const isTitleMisplaced = (post) =>
  collapse(post?.title).length > TITLE_MAX_LENGTH && isBodyEmpty(post);

/**
 * A short title from the first words of a text: the first sentence when it is short,
 * otherwise the words that fit into `length` characters followed by «…».
 */
export const makeTitle = (text, length = AUTO_TITLE_LENGTH) => {
  const plain = collapse(text);
  if (plain.length <= length) return plain;

  const words = plain.split(' ');
  let title = '';
  for (let i = 0; i < words.length; i += 1) {
    const next = title ? `${title} ${words[i]}` : words[i];
    if (next.length > length) break;
    title = next;
    // a whole short sentence reads better than a cut one
    if (i >= 2 && /[.!?]$/.test(words[i])) return title.replace(/\.$/, '');
  }
  // a single enormous "word" (e.g. a link) still has to be cut somewhere
  if (!title) title = plain.slice(0, length);
  return `${title.replace(/[\s,;:.–—-]+$/, '')}${ELLIPSIS}`;
};

const textToDelta = (text) => ({
  ops: String(text)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => ({ insert: `${line}\n` }))
});

/**
 * Moves an article from the title into the body when the title is too long and the body
 * has no text. Photos, video and every other field are kept. Other posts are returned as is.
 */
export const normalizePost = (post) => {
  if (!post || !isTitleMisplaced(post)) return post;
  const body = String(post.title).trim();
  const delta = textToDelta(body);
  // photos pasted into the body stay there, after the moved text
  const oldOps = post.delta?.ops || [];
  const hasEmbeds = oldOps.some((op) => op?.insert && typeof op.insert === 'object');
  return {
    ...post,
    title: makeTitle(body),
    text: getPlainText(body),
    delta: { ops: hasEmbeds ? [...delta.ops, ...oldOps] : delta.ops }
  };
};

/**
 * True when the body already starts with the title,
 * e.g. a title made by `makeTitle` («Перші слова статті…»).
 */
export const isTitleRepeated = (post) => {
  const title = collapse(post?.title).replace(TRAILING_DOTS_RE, '').trim().toLowerCase();
  if (!title) return false;
  const body = getPlainText(post?.text).toLowerCase();
  if (!body.startsWith(title)) return false;
  // "Увага" must not hide the title of a body that starts with "Увагам ..."
  const nextChar = body.charAt(title.length);
  return !nextChar || !WORD_CHAR_RE.test(nextChar);
};
