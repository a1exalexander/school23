import { MAX_IMAGE_SIZE_MB } from './upload';

export const ERROR_MESSAGE = 'Упс! Щось сталося(';
export const SUCCESS_MESSAGE = 'Success!';
export const INFO_MESSAGE = 'Pay attention';

// Uploading
export const IMAGE_TOO_LARGE = `Фото завелике. Максимум — ${MAX_IMAGE_SIZE_MB} МБ. Стисніть його або оберіть інше 🖼`;
export const IMAGE_UPLOAD_FORBIDDEN = `Не вдалося завантажити фото. Найімовірніше, воно важче за ${MAX_IMAGE_SIZE_MB} МБ. Стисніть його і спробуйте ще раз 🖼`;
export const IMAGE_UPLOAD_NETWORK =
  'Фото не завантажилось: схоже, зникло зʼєднання. Перевірте інтернет і спробуйте ще раз 📡';
export const IMAGE_UPLOAD_ERROR =
  'Не вдалося завантажити фото. Спробуйте ще раз або оберіть інше 🖼';
export const POST_SAVE_ERROR = `Не вдалося зберегти. Перевірте, чи всі фото не важчі за ${MAX_IMAGE_SIZE_MB} МБ, і спробуйте ще раз`;
