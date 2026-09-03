// Firebase Storage rules reject any image heavier than 2 MB,
// so the whole admin uses the same limit for client side validation.
export const MAX_IMAGE_SIZE_MB = 2;
export const MAX_IMAGE_SIZE = MAX_IMAGE_SIZE_MB * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
export const ERROR_NOTIFICATION_TIMEOUT = 10000;
