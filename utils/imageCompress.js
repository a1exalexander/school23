import { MAX_IMAGE_SIZE } from '../constants/upload';

// Bigger than any screen the site is shown on, small enough to fit into the limit
export const MAX_IMAGE_SIDE = 2560;
// Photos straight from a phone camera are 5-15 MB, anything above this is not a photo
export const MAX_SOURCE_IMAGE_SIZE = 40 * 1024 * 1024;

const QUALITY_STEPS = [0.85, 0.75, 0.65, 0.55];

/**
 * Size that fits into a `maxSide` × `maxSide` box keeping the proportions
 * @param {number} width
 * @param {number} height
 * @param {number} [maxSide]
 * @returns {{ width: number, height: number }}
 */
export const fitSize = (width, height, maxSide = MAX_IMAGE_SIDE) => {
  const scale = Math.min(1, maxSide / Math.max(width, height));
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
};

/** `photo.png` -> `photo.jpg`, the compressed image is always a JPEG */
export const toJpegName = (name = 'photo') => `${String(name).replace(/\.[^.]+$/, '')}.jpg`;

const loadImage = (file) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = (error) => {
      URL.revokeObjectURL(url);
      reject(error);
    };
    image.src = url;
  });

const toBlob = (canvas, quality) =>
  new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));

/**
 * Shrinks a photo that is heavier than the Firebase Storage limit, so the admin
 * can drop a picture straight from the phone without compressing it by hand.
 * Lighter files are returned untouched.
 * @param {File} file
 * @param {number} [maxSize]
 * @returns {Promise<File>}
 */
export const compressImage = async (file, maxSize = MAX_IMAGE_SIZE) => {
  if (!file || file.size <= maxSize) return file;

  const image = await loadImage(file);
  let side = MAX_IMAGE_SIDE;

  // make the picture smaller step by step until it fits into the limit
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const { width, height } = fitSize(image.naturalWidth, image.naturalHeight, side);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    // a transparent PNG would turn black in a JPEG
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    for (let i = 0; i < QUALITY_STEPS.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const blob = await toBlob(canvas, QUALITY_STEPS[i]);
      if (blob && blob.size <= maxSize) {
        return new File([blob], toJpegName(file.name), { type: 'image/jpeg' });
      }
    }
    side = Math.round(side * 0.75);
  }

  return file;
};

export default compressImage;
