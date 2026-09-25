/**
 * The Facebook video link of a post. Some old posts keep it as an array of single
 * characters (["h", "t", "t", "p", ...]) instead of a string, so it is glued back together.
 */
export const getVideoUrl = (video) => {
  const value = Array.isArray(video) ? video.join('') : video;
  return typeof value === 'string' ? value.trim() : '';
};

// only these links point to a video; the Facebook video player shows an empty dark box
// for anything else (a post, a group permalink, a short share link)
const VIDEO_URL_RE = /facebook\.com\/(.+\/videos\/|watch|reel\/|share\/[vr]\/)|fb\.watch\//i;

/** True when the Facebook video player can play the link */
export const isVideoEmbeddable = (url) => VIDEO_URL_RE.test(getVideoUrl(url));

/** Address of the Facebook video player for the link */
export const getVideoEmbedSrc = (url) =>
  `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    getVideoUrl(url)
  )}&show_text=false&appId=2464432437148222`;
