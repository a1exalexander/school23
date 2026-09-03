import { MAX_IMAGE_SIZE, MAX_IMAGE_SIZE_MB } from '../constants/upload';

const MAX_FILE_NAME_LENGTH = 24;

/**
 * Firebase Storage error codes that mean "the file did not pass the rules".
 * The storage rules limit an image to 2 MB, so an unauthorized upload
 * from the admin is almost always an oversized picture.
 */
const SIZE_ERROR_CODES = ['storage/unauthorized', 'storage/invalid-argument', 'file-too-large'];
const NETWORK_ERROR_CODES = ['storage/retry-limit-exceeded', 'storage/server-file-wrong-size'];

/**
 * Get the size (in bytes) of a File or of a FilePond file item
 * @param {File|Object} file
 * @returns {number}
 */
export const getFileSize = (file) => {
  const size = file?.size ?? file?.fileSize ?? file?.file?.size;
  return Number(size) || 0;
};

/**
 * Get a readable name of a File or of a FilePond file item
 * @param {File|Object} file
 * @returns {string}
 */
export const getFileName = (file) => {
  const name = file?.name || file?.filename || file?.file?.name || '';
  if (name.length <= MAX_FILE_NAME_LENGTH) return name;
  return `${name.slice(0, MAX_FILE_NAME_LENGTH)}…`;
};

/**
 * Format bytes into a short human readable string in Ukrainian
 * @param {number} bytes
 * @returns {string}
 */
export const formatFileSize = (bytes) => {
  const size = Number(bytes) || 0;
  if (size < 1024) return `${size} Б`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} КБ`;
  return `${(size / (1024 * 1024)).toFixed(1).replace('.', ',')} МБ`;
};

/**
 * Check that a file fits into the Firebase Storage limit
 * @param {File|Object} file
 * @param {number} [maxSize]
 * @returns {boolean}
 */
export const isFileTooLarge = (file, maxSize = MAX_IMAGE_SIZE) => getFileSize(file) > maxSize;

/**
 * Build a user friendly message about oversized images
 * @param {Array<File|Object>} files
 * @returns {string}
 */
export const getImageTooLargeMessage = (files = []) => {
  const list = (Array.isArray(files) ? files : [files]).filter(Boolean);
  const describe = (file) => {
    const name = getFileName(file);
    const size = formatFileSize(getFileSize(file));
    return name ? `«${name}» — ${size}` : size;
  };

  if (list.length === 1) {
    return `Фото ${describe(
      list[0]
    )}. Максимум — ${MAX_IMAGE_SIZE_MB} МБ. Стисніть його або оберіть інше 🖼`;
  }

  return `Ці фото важчі за ${MAX_IMAGE_SIZE_MB} МБ: ${list
    .map(describe)
    .join(', ')}. Стисніть їх або оберіть інші 🖼`;
};

/**
 * Does the error mean that the file did not fit into the size limit?
 * @param {Error|Object} error
 * @returns {boolean}
 */
export const isFileSizeError = (error) => SIZE_ERROR_CODES.includes(error?.code);

/**
 * Does the error mean that something went wrong with the connection?
 * @param {Error|Object} error
 * @returns {boolean}
 */
export const isNetworkError = (error) => NETWORK_ERROR_CODES.includes(error?.code);
