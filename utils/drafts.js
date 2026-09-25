import { logger } from '../services';

const PREFIX = 'school23_draft_';

/**
 * Drafts of the admin editor live in the browser's localStorage,
 * so an unfinished text survives a reload, a closed tab or a switch to another admin tab.
 * Photos are not kept: they are too heavy for localStorage.
 */
export const readDraft = (key) => {
  try {
    const raw = localStorage.getItem(`${PREFIX}${key}`);
    const draft = raw ? JSON.parse(raw) : null;
    return draft && draft.fields ? draft : null;
  } catch (error) {
    logger.error(error, 'READ DRAFT');
    return null;
  }
};

/** @returns {number|null} the time the draft was saved at, null when it couldn't be saved */
export const saveDraft = (key, fields) => {
  try {
    const savedAt = Date.now();
    localStorage.setItem(`${PREFIX}${key}`, JSON.stringify({ fields, savedAt }));
    return savedAt;
  } catch (error) {
    // e.g. a text with many pasted pictures doesn't fit into the storage
    logger.error(error, 'SAVE DRAFT');
    return null;
  }
};

export const clearDraft = (key) => {
  try {
    localStorage.removeItem(`${PREFIX}${key}`);
  } catch (error) {
    logger.error(error, 'CLEAR DRAFT');
  }
};
