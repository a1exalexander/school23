/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  arrayOf,
  bool,
  func,
  instanceOf,
  number,
  object,
  oneOf,
  oneOfType,
  shape,
  string
} from 'prop-types';
import ImageCompress from 'quill-image-compress';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module';
import { ImageDrop } from 'quill-image-drop-module';
import DatePicker, { registerLocale } from 'react-datepicker';
import uk from 'date-fns/locale/uk';
import 'react-datepicker/dist/react-datepicker.min.css';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import Router from 'next/router';
import moment from 'moment';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import OutsideClickHandler from 'react-outside-click-handler';
import classNames from 'classnames';
import { SButton, SInput, SRadio } from '../../index';
import actions from '../../../store/actions';
import { cleanNewsCache } from '../../../store/modules/news/actions';
import { db, storage } from '../../../firebase';
import {
  ACCEPTED_IMAGE_TYPES,
  ERROR_NOTIFICATION_TIMEOUT,
  MAX_IMAGE_SIZE_MB,
  messages,
  routes
} from '../../../constants';
import { STransition } from '../../common/transition';
import { SModal } from '../../common/SModal';
import { AdminPostPreview } from './AdminPostPreview';
import {
  formatFileSize,
  getFileName,
  getFileSize,
  getImageTooLargeMessage,
  isFileTooLarge,
  isObject,
  isString
} from '../../../utils';
import { compressImage, MAX_SOURCE_IMAGE_SIZE } from '../../../utils/imageCompress';
import { clearDraft, readDraft, saveDraft } from '../../../utils/drafts';
import {
  isBodyEmpty,
  isTitleHidden,
  normalizePost,
  TITLE_MAX_LENGTH
} from '../../../utils/postTitle';

registerLocale('uk', uk);

Quill.register(
  {
    'modules/imageResize': ImageResize,
    'modules/imageDrop': ImageDrop,
    'modules/imageCompress': ImageCompress
  },
  true
);

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote'],
  ['link', 'image'],
  [{ align: ['justify', 'center', false, 'right'] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  ['clean']
];

const formats = [
  'header',
  'bold',
  'font',
  'italic',
  'underline',
  'size',
  'background',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'direction',
  'align',
  'image',
  'formula',
  'code-block',
  'color'
];

const EMOJI_I18N = {
  search: 'Пошук',
  notfound: 'Нічого не знайдено',
  categories: {
    search: 'Результати пошуку',
    recent: 'Нещодавні',
    people: 'Смайлики та люди',
    nature: 'Тварини та природа',
    foods: 'Їжа та напої',
    activity: 'Активності',
    places: 'Подорожі та місця',
    objects: 'Предмети',
    symbols: 'Символи',
    flags: 'Прапори'
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return { ...state, ...action.payload };
    case 'title':
      return { ...state, title: action.payload };
    case 'iframe':
      return { ...state, iframe: action.payload };
    case 'text':
      return { ...state, text: action.payload };
    case 'delta':
      return { ...state, delta: action.payload };
    case 'type':
      return { ...state, type: action.payload };
    case 'loading':
      return { ...state, loading: action.payload };
    case 'images':
      return { ...state, images: [...action.payload] };
    case 'video':
      return { ...state, video: action.payload };
    case 'clean':
      return {
        ...state,
        title: '',
        text: '',
        video: '',
        delta: { ops: [] },
        images: [],
        oldImages: [],
        date: new Date()
      };
    default:
      throw new Error();
  }
};

const initState = {
  loading: false,
  title: '',
  text: '',
  type: 'post',
  delta: { ops: [] },
  modules: {},
  images: [],
  oldImages: [],
  iframe: '',
  video: '',
  emoji: false,
  preview: false,
  draftSavedAt: null,
  draftRestoredAt: null,
  date: null
};

// Quill has no translations, so the toolbar buttons get Ukrainian hints this way
const TOOLBAR_TITLES = {
  '.ql-bold': 'Жирний',
  '.ql-italic': 'Курсив',
  '.ql-underline': 'Підкреслений',
  '.ql-strike': 'Закреслений',
  '.ql-blockquote': 'Цитата',
  '.ql-link': 'Посилання',
  '.ql-image': 'Вставити фото в текст',
  '.ql-align': 'Вирівнювання',
  '.ql-list[value="ordered"]': 'Нумерований список',
  '.ql-list[value="bullet"]': 'Маркований список',
  '.ql-indent[value="-1"]': 'Зменшити відступ',
  '.ql-indent[value="+1"]': 'Збільшити відступ',
  '.ql-size': 'Розмір тексту',
  '.ql-header': 'Заголовок',
  '.ql-color': 'Колір тексту',
  '.ql-background': 'Колір виділення',
  '.ql-clean': 'Прибрати форматування'
};

const DRAFT_SAVE_DELAY = 800;

/** Firestore Timestamp, Date or string -> Date */
const toJsDate = (value) => {
  if (!value) return null;
  if (typeof value.toDate === 'function') return value.toDate();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

/** The part of the form that is kept in a draft and compared to find unsaved changes */
const getDraftFields = (state, withDate) => ({
  title: state.title || '',
  text: state.text || '',
  delta: state.delta || { ops: [] },
  video: state.video || '',
  type: state.type || initState.type,
  // only the canteen menu has a date; a local day, not UTC, so it survives the time zone
  date: withDate && state.date ? moment(toJsDate(state.date)).format('YYYY-MM-DD') : null
});

const isSameDraft = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const isEmptyDraft = (fields) =>
  !fields.title.trim() && !fields.text.trim() && !fields.video.trim();

// What every kind of entry is, where it shows up on the site and what it needs
const TYPE_INFO = {
  post: {
    hint: 'Новина зʼявиться першою на сторінці «Новини». Потрібні заголовок і текст або фото.',
    titleLabel: 'Заголовок новини',
    textLabel: 'Текст новини',
    publish: 'Опублікувати новину',
    success: 'Новину опубліковано!'
  },
  page: {
    hint:
      'Документ або сторінка для розділу «Публічна інформація» (звіти, положення, кошториси). Потрібні заголовок і текст або фото.',
    titleLabel: 'Назва документа',
    textLabel: 'Текст документа',
    publish: 'Опублікувати документ',
    success: 'Документ опубліковано!'
  },
  activity: {
    hint:
      'Матеріал для розділу «Діяльність гімназії»: гуртки, проєкти, самоврядування. Потрібні заголовок і текст або фото.',
    titleLabel: 'Заголовок',
    textLabel: 'Текст',
    publish: 'Опублікувати',
    success: 'Матеріал опубліковано!'
  },
  canteen: {
    hint: 'Фото меню шкільної їдальні. Оберіть день, на який це меню, і додайте хоча б одне фото.',
    titleLabel: 'Коментар до меню (не обовʼязково)',
    publish: 'Опублікувати меню',
    success: 'Меню опубліковано!'
  }
};

class AdminPostEditor extends Component {
  modules = {
    toolbar: toolbarOptions,
    imageResize: {},
    imageDrop: true,
    imageCompress: {
      quality: 0.7,
      maxWidth: 1000,
      maxHeight: 1000,
      imageType: ['image/jpeg', 'image/png'],
      debug: false
    }
  };

  constructor() {
    super();
    this.state = { ...initState, date: new Date(), modules: this.modules };
    this.quillRef = null;
    this.reactQuillRef = null;
    this.tooLargeImages = [];
    this.tooLargeImagesTimer = null;
    this.draftTimer = null;
    this.initialFields = null;
    this.userEdited = false;
    this.toolbarTranslated = false;
  }

  componentDidMount() {
    const payload = this.getInitialPayload();
    this.initialFields = this.getFields({ ...this.state, ...payload });

    // an unfinished text survives a closed tab, a reload or a switch to another admin tab
    const draft = readDraft(this.getDraftKey());
    const draftFields = draft && this.getFields(draft.fields);
    const hasDraft =
      draftFields && !isEmptyDraft(draftFields) && !isSameDraft(draftFields, this.initialFields);
    const draftPayload = hasDraft
      ? {
          ...draft.fields,
          date: draft.fields.date ? moment(draft.fields.date, 'YYYY-MM-DD').toDate() : payload.date,
          draftRestoredAt: draft.savedAt
        }
      : {};

    this.setState((prevState) => ({
      ...prevState,
      ...payload,
      ...draftPayload,
      modules: this.modules
    }));
    window.addEventListener('beforeunload', this.onBeforeUnload);
  }

  componentDidUpdate(prevProps, prevState) {
    this.attachQuillRefs();
    if (!isSameDraft(this.getFields(prevState), this.getFields(this.state))) {
      clearTimeout(this.draftTimer);
      this.draftTimer = setTimeout(this.saveDraft, DRAFT_SAVE_DELAY);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.tooLargeImagesTimer);
    clearTimeout(this.draftTimer);
    // don't lose the last keystrokes when the editor is closed right after typing
    if (!this.published) this.saveDraft();
    window.removeEventListener('beforeunload', this.onBeforeUnload);
  }

  getInitialPayload = () => {
    const { post: rawPost, type } = this.props;
    // an old entry with the whole article in the title opens already fixed
    const post = type === 'canteen' ? rawPost : normalizePost(rawPost);
    return {
      title: post?.title || '',
      delta: post?.delta || { ops: [] },
      text: post?.text || '',
      type: post?.type || initState.type,
      iframe: post?.iframe || '',
      video: post?.video || '',
      oldImages: post?.images || [],
      date: toJsDate(post?.date) || new Date()
    };
  };

  getFields = (state) => {
    const { type } = this.props;
    return getDraftFields(state, type === 'canteen');
  };

  getDraftKey = () => {
    const { isUpdate, post, type } = this.props;
    return isUpdate ? `edit_${type}_${post?.id}` : `new_${type}`;
  };

  hasUnsavedChanges = () => {
    const { images } = this.state;
    if (this.published || !this.initialFields) return false;
    return !!images?.length || !isSameDraft(this.getFields(this.state), this.initialFields);
  };

  saveDraft = () => {
    if (!this.initialFields || this.published) return;
    const fields = this.getFields(this.state);
    if (isSameDraft(fields, this.initialFields) || isEmptyDraft(fields)) {
      clearDraft(this.getDraftKey());
      return;
    }
    const savedAt = saveDraft(this.getDraftKey(), fields);
    if (savedAt) this.setState((prevState) => ({ ...prevState, draftSavedAt: savedAt }));
  };

  discardDraft = () => {
    // eslint-disable-next-line no-alert
    const ok = window.confirm('Прибрати чернетку і почати з початку?');
    if (!ok) return;
    clearTimeout(this.draftTimer);
    clearDraft(this.getDraftKey());
    this.userEdited = false;
    this.setState((prevState) => ({
      ...prevState,
      ...this.getInitialPayload(),
      images: [],
      draftRestoredAt: null,
      draftSavedAt: null
    }));
  };

  onBeforeUnload = (e) => {
    if (!this.hasUnsavedChanges()) return undefined;
    // the text is kept in the draft anyway, but photos that are not uploaded yet would be lost
    const { images } = this.state;
    if (!images?.length) return undefined;
    e.preventDefault();
    e.returnValue = '';
    return '';
  };

  togglePreview = (preview) => {
    this.setState((prevState) => ({ ...prevState, preview }));
  };

  translateToolbar = (editor) => {
    const toolbar = editor.getModule('toolbar')?.container;
    if (!toolbar || this.toolbarTranslated) return;
    Object.entries(TOOLBAR_TITLES).forEach(([selector, title]) => {
      toolbar.querySelectorAll(selector).forEach((el) => el.setAttribute('title', title));
    });
    this.toolbarTranslated = true;
  };

  onDateChange = (date) => {
    this.setState((prevState) => ({ ...prevState, date }));
  };

  toggleEmoji = (boolean) => {
    const { emoji } = this.state;
    const result = boolean ?? !emoji;
    this.setState((prevState) => ({ ...prevState, emoji: result }));
  };

  onDispatch = (type) => (payload) => {
    this.setState((prevState) => reducer(prevState, { type, payload }));
  };

  attachQuillRefs = () => {
    if (typeof this?.reactQuillRef?.getEditor !== 'function') {
      return;
    }
    const editor = this.reactQuillRef.getEditor();
    this.quillRef = this.reactQuillRef.makeUnprivilegedEditor(editor);
    this.translateToolbar(editor);
  };

  handleChange = (content, change, source) => {
    if (this.quillRef) {
      const delta = this.quillRef.getContents();
      const cfg = {};
      const converter = new QuillDeltaToHtmlConverter(delta.ops, cfg);
      const conerted = converter.convert();
      const text = conerted.replace(/(<([^>]+)>)/gi, '').trim();
      const { draftRestoredAt } = this.state;
      if (source === 'user') {
        this.userEdited = true;
      } else if (!this.userEdited && !draftRestoredAt && this.initialFields) {
        // Quill rewrites the loaded text in its own way (e.g. adds a trailing line break);
        // that is not a change made by the admin, so it must not count as an unsaved draft
        this.initialFields = { ...this.initialFields, text, delta: { ...delta } };
      }
      this.setState((prevState) => {
        return {
          ...prevState,
          text,
          delta: { ...delta }
        };
      });
    }
  };

  /**
   * A whole article pasted into the title while the body is still empty is moved
   * into the body right away, and the title becomes its first words.
   */
  onTitleChange = (value) => {
    const { type, notify } = this.props;
    const { text, delta } = this.state;
    const tooLong = String(value || '').trim().length > TITLE_MAX_LENGTH;
    if (type === 'canteen' || !tooLong || !isBodyEmpty({ text, delta })) {
      this.onDispatch('title')(value);
      return;
    }
    const moved = normalizePost({ title: value, text, delta });
    // Quill reports the new text as its own change, but this one was made by the admin
    this.userEdited = true;
    this.setState((prevState) => ({
      ...prevState,
      title: moved.title,
      text: moved.text,
      delta: moved.delta
    }));
    notify(
      'info',
      'Це схоже на основний текст, тому ми перенесли його в поле «Текст» нижче. Заголовок — перші слова, його можна змінити.',
      ERROR_NOTIFICATION_TIMEOUT
    );
  };

  onEmojiChange = (emoji) => {
    const icon = emoji?.native || emoji?.unified;
    const editor = this.reactQuillRef?.getEditor?.();
    if (!icon || !editor) return;
    // put the emoji where the cursor was, or at the end of the text if the editor wasn't focused
    const range = editor.getSelection(true);
    const index = range ? range.index : Math.max(editor.getLength() - 1, 0);
    editor.insertText(index, icon, 'user');
    editor.setSelection(index + icon.length, 0);
  };

  _onSubmit = async (e) => {
    const { notify, isUpdate, onUpdate, type, onNewsChange } = this.props;
    const {
      state,
      state: { images, oldImages = [] },
      onDispatch
    } = this;
    const post = {
      title: state.title,
      images: [...oldImages]
    };
    let http = 'addPost';
    const messageSuccess = (TYPE_INFO[type] || TYPE_INFO.post).success;
    let route = routes.NEWS;
    if (type !== 'canteen') {
      // an article left in the title is moved into the body, a short title is made from it
      const fixed = normalizePost({ title: state.title, text: state.text, delta: state.delta });
      post.title = fixed.title;
      post.delta = fixed.delta;
      post.text = fixed.text;
    }

    if (type !== 'canteen' && type !== 'activity') {
      post.iframe = state.iframe;
      post.video = state.video;
    }

    if (type === 'post') {
      post.type = state.type;
    }

    if (type === 'page') {
      http = 'addPublicInfo';
      route = routes.PUBLIC_INFO;
    }

    if (type === 'canteen') {
      http = 'addFood';
      route = routes.SCHOOL_CANTEEN;
      post.date = state.date;
    }

    if (type === 'activity') {
      http = 'addActivityPost';
      route = routes.ACTIVITY;
    }

    if (typeof e?.preventDefault === 'function') {
      e.preventDefault();
    }

    onDispatch('loading')(true);
    if (images.length) {
      // Firebase Storage refuses images heavier than 2 MB, so big photos from a phone
      // are shrunk right here instead of making the admin compress them by hand
      let prepared;
      try {
        prepared = await Promise.all(
          images.map(async (item) => ({
            file: await compressImage(item.file),
            id: item.id,
            filenameWithoutExtension: item.filenameWithoutExtension
          }))
        );
      } catch (error) {
        notify('error', messages.IMAGE_COMPRESS_ERROR, ERROR_NOTIFICATION_TIMEOUT);
        onDispatch('loading')(false);
        return;
      }
      const tooLargeImages = prepared.filter((image) => isFileTooLarge(image.file));
      if (tooLargeImages.length) {
        notify(
          'error',
          getImageTooLargeMessage(tooLargeImages.map((image) => image.file)),
          ERROR_NOTIFICATION_TIMEOUT
        );
        onDispatch('loading')(false);
        return;
      }
      try {
        const savedImages = await Promise.all(
          prepared.map(async (file) => {
            const image = await storage.addPostImage(file);
            return image;
          })
        );
        post.images = [...oldImages, ...savedImages];
      } catch (error) {
        notify('error', error?.message || messages.IMAGE_UPLOAD_ERROR, ERROR_NOTIFICATION_TIMEOUT);
        onDispatch('loading')(false);
        return;
      }
    }
    post.images = (post?.images || []).filter((image) => isObject(image) || isString(image));
    if (isUpdate) {
      const ok = await onUpdate(post);
      if (ok) this.onPublished();
    } else {
      const res = await db[http](post);
      if (res) {
        this.onPublished();
        if (http === 'addPost') onNewsChange();
        notify('success', messageSuccess);
        onDispatch('clean')();
        Router.push(route);
      } else {
        notify('error', messages.POST_SAVE_ERROR, ERROR_NOTIFICATION_TIMEOUT);
      }
    }
    if (!this.published) onDispatch('loading')(false);
  };

  onPublished = () => {
    this.published = true;
    clearTimeout(this.draftTimer);
    clearDraft(this.getDraftKey());
  };

  /**
   * Show one toast for the whole batch of dropped files
   * instead of a separate one for every oversized image
   */
  notifyTooLargeImage = (file) => {
    const { notify } = this.props;
    this.tooLargeImages.push(file);
    clearTimeout(this.tooLargeImagesTimer);
    this.tooLargeImagesTimer = setTimeout(() => {
      const list = this.tooLargeImages
        .map((item) => `«${getFileName(item)}» — ${formatFileSize(getFileSize(item))}`)
        .join(', ');
      notify(
        'error',
        `Файл завеликий для фото: ${list}. Оберіть інше зображення 🖼`,
        ERROR_NOTIFICATION_TIMEOUT
      );
      this.tooLargeImages = [];
    }, 100);
  };

  /**
   * Photos over 2 MB are compressed when the entry is published,
   * only files that can't be a photo at all are rejected right away.
   */
  beforeAddFile = (item) => {
    if (isFileTooLarge(item?.file, MAX_SOURCE_IMAGE_SIZE)) {
      this.notifyTooLargeImage(item?.file);
      return false;
    }
    return true;
  };

  onRemoveImage = (removingId) => {
    const { oldImages = [] } = this.state;
    const shallowCopy = [...oldImages];
    const idx = shallowCopy.findIndex(({ id }) => id === removingId);
    if (idx >= 0) {
      shallowCopy.splice(idx, 1);
      this.setState((prevState) => ({ ...prevState, oldImages: shallowCopy }));
    }
  };

  render() {
    const { state, onDispatch, handleChange, _onSubmit, props } = this;
    const info = TYPE_INFO[props.type] || TYPE_INFO.post;
    const isCanteen = props.type === 'canteen';

    // tells the admin exactly what's still missing instead of a silently disabled button
    const getMissing = () => {
      if (isCanteen) {
        if (!state.date) return 'Оберіть дату меню';
        if (!state.images?.length && !state.oldImages?.length) {
          return 'Додайте хоча б одне фото меню';
        }
        return null;
      }
      if (!state.title?.trim()) return 'Додайте заголовок';
      if (state.title.trim().length > TITLE_MAX_LENGTH) {
        return `Заголовок задовгий — скоротіть до ${TITLE_MAX_LENGTH} символів, а решту перенесіть у текст`;
      }
      const hasImages = !!state.images?.length || !!state.oldImages?.length;
      if (!hasImages && !state.text?.trim()) return 'Додайте текст або фото';
      return null;
    };
    const missing = getMissing();
    const titleLength = state.title?.trim().length || 0;
    const titleHidden = !isCanteen && isTitleHidden(state);
    const formatTime = (time) => moment(time).calendar(null, { sameElse: 'D MMMM о HH:mm' });

    return (
      <div className="admin-post">
        {!props.isUpdate && <p className="admin-post__hint">{info.hint}</p>}
        {state.draftRestoredAt && (
          <div className="admin-post__draft">
            <p className="admin-post__draft-text">
              {`Відновлено незбережену чернетку (${formatTime(state.draftRestoredAt)}).`}
              {!isCanteen && ' Фото, якщо вони були, потрібно додати ще раз.'}
            </p>
            <SButton type="transparent" size="small" onClick={this.discardDraft}>
              Почати з початку
            </SButton>
          </div>
        )}
        {props.type === 'post' && (
          <div className="admin-post__field">
            <span className="admin-post__label">Тип публікації</span>
            <div className="admin-post__radio-group">
              <SRadio name="post" onChange={onDispatch('type')} checked={state.type} value="post">
                Стаття
              </SRadio>
              <SRadio
                name="post"
                onChange={onDispatch('type')}
                checked={state.type}
                value="announcement"
              >
                Оголошення
              </SRadio>
            </div>
            <span className="admin-post__help">
              Оголошення виділяється на сайті червоною позначкою — для важливих і термінових новин.
            </span>
          </div>
        )}
        {isCanteen && (
          <div className="admin-post__input-wrapper">
            <span className="admin-post__label">
              <sup>*</sup>На який день це меню
            </span>
            <DatePicker
              dateFormat="EEEE, d MMMM yyyy"
              locale="uk"
              className="admin-post__datepicker"
              selected={state.date}
              onChange={this.onDateChange}
            />
          </div>
        )}
        <div className="admin-post__field">
          <SInput
            className="admin-post__input"
            onChange={this.onTitleChange}
            value={state.title}
            placeholder={isCanteen ? undefined : 'Коротко, в одне речення'}
          >
            {isCanteen ? (
              info.titleLabel
            ) : (
              <span>
                <sup>*</sup>
                {info.titleLabel}
              </span>
            )}
          </SInput>
          {!isCanteen && (
            <div className="admin-post__help-row">
              <span className="admin-post__help">
                {titleHidden
                  ? 'Заголовок збігається з початком тексту, тому на самій сторінці його не видно — лише в списку і в пошуковиках.'
                  : 'Лише назва. Сам текст пишіть у полі нижче ↓'}
              </span>
              <span
                className={classNames('admin-post__counter', {
                  _error: titleLength > TITLE_MAX_LENGTH
                })}
              >
                {`${titleLength} / ${TITLE_MAX_LENGTH}`}
              </span>
            </div>
          )}
        </div>
        {!isCanteen && (
          <div className="admin-post__field">
            <div className="admin-post__label-row">
              <span className="admin-post__label">{info.textLabel || 'Текст'}</span>
              <div className="admin-post__emoji-wrapper">
                <SButton
                  className="admin-post__emoji-btn"
                  type="transparent"
                  size="small"
                  onClick={() => {
                    if (!state.emoji) {
                      this.toggleEmoji(true);
                    }
                  }}
                >
                  <span role="img" aria-label="emoji" style={{ marginRight: 8 }}>
                    😊
                  </span>
                  Додати емодзі
                </SButton>
                <STransition inProp={state.emoji}>
                  <div className="admin-post__emoji">
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        if (state.emoji) {
                          setTimeout(() => this.toggleEmoji(false), 100);
                        }
                      }}
                    >
                      <Picker
                        i18n={EMOJI_I18N}
                        showPreview={false}
                        showSkinTones={false}
                        style={{
                          backgroundColor: 'white'
                        }}
                        onSelect={this.onEmojiChange}
                      />
                    </OutsideClickHandler>
                  </div>
                </STransition>
              </div>
            </div>
            <ReactQuill
              ref={(el) => {
                this.reactQuillRef = el;
              }}
              className="admin-post__input admin-post__editor"
              value={state.delta}
              onChange={handleChange}
              modules={state.modules}
              formats={formats}
              placeholder="Тут основний текст: усе, що має прочитати відвідувач. Фото можна вставити просто в текст або додати нижче."
            />
          </div>
        )}
        <div className="admin-post__field">
          <span className="admin-post__label">
            {isCanteen ? (
              <>
                <sup>*</sup>Фото меню
              </>
            ) : (
              'Фото (не обовʼязково)'
            )}
          </span>
          <FilePond
            className="admin-post__images"
            files={state.images}
            allowMultiple
            acceptedFileTypes={ACCEPTED_IMAGE_TYPES}
            maxFiles={10}
            beforeAddFile={this.beforeAddFile}
            onupdatefiles={onDispatch('images')}
            labelIdle={`Перетягніть фото сюди або <br/><span class="filepond--label-action">оберіть файли</span><br/><span class="filepond--label-hint">JPG або PNG, не більше 10 фото. Фото понад ${MAX_IMAGE_SIZE_MB} МБ стиснемо автоматично</span>`}
            labelFileTypeNotAllowed="Цей формат не підходить"
            fileValidateTypeLabelExpectedTypes="Потрібне фото JPG або PNG"
            labelMaxFilesExceeded="Забагато фото"
            labelTapToCancel="натисніть, щоб скасувати"
            labelTapToUndo="натисніть, щоб повернути"
            labelButtonRemoveItem="Прибрати"
          />
        </div>
        {!!state?.oldImages?.length && (
          <div className="admin-post__field">
            <span className="admin-post__label">Вже додані фото</span>
            <ul className="admin-post__images-old">
              {state?.oldImages?.map(({ id, src }) => (
                <li key={id} className="admin-post__old-image-item">
                  <SButton
                    onClick={() => this.onRemoveImage(id)}
                    className="admin-post__images-remove-btn"
                    type="danger"
                    size="small"
                  >
                    Прибрати
                  </SButton>
                  <img src={src} alt="" />
                </li>
              ))}
            </ul>
          </div>
        )}
        {!['canteen', 'activity'].includes(props.type) && (
          <SInput className="admin-post__input" onChange={onDispatch('video')} value={state.video}>
            Посилання на відео з Facebook (не обовʼязково)
          </SInput>
        )}
        <div className="admin-post__actions">
          <SButton
            className="admin-post__submit"
            loading={state.loading}
            onClick={_onSubmit}
            disabled={!!missing}
            label={props.isUpdate ? 'Зберегти зміни' : info.publish}
          />
          <SButton
            className="admin-post__preview-btn"
            type="transparent"
            onClick={() => this.togglePreview(true)}
            label="Попередній перегляд"
          />
          {missing && <span className="admin-post__missing">{missing}</span>}
          {!missing && state.draftSavedAt && (
            <span className="admin-post__saved">Чернетку збережено</span>
          )}
        </div>
        <SModal
          open={state.preview}
          onClose={() => this.togglePreview(false)}
          title="Так це виглядатиме на сайті"
          wide={!isCanteen}
        >
          <AdminPostPreview
            type={props.type}
            post={{
              title: state.title,
              text: state.text,
              delta: state.delta,
              type: state.type,
              video: state.video,
              date: state.date,
              created: props.post?.created
            }}
            images={state.oldImages}
            files={state.images}
          />
          <div className="admin-post__preview-actions">
            <SButton
              loading={state.loading}
              onClick={async () => {
                await _onSubmit();
                if (!this.published) this.togglePreview(false);
              }}
              disabled={!!missing}
              label={props.isUpdate ? 'Зберегти зміни' : info.publish}
            />
            <SButton
              type="transparent"
              onClick={() => this.togglePreview(false)}
              label="Повернутись до редагування"
            />
            {missing && <span className="admin-post__missing">{missing}</span>}
          </div>
        </SModal>
      </div>
    );
  }
}

AdminPostEditor.defaultProps = {
  notify: () => undefined,
  onNewsChange: () => undefined,
  isUpdate: false,
  onUpdate: () => undefined,
  post: undefined,
  type: 'post'
};

AdminPostEditor.propTypes = {
  type: oneOf(['post', 'page', 'canteen', 'activity']),
  notify: func,
  onNewsChange: func,
  isUpdate: bool,
  onUpdate: func,
  post: shape({
    id: oneOfType([number, string]),
    title: string,
    text: string,
    type: string,
    dalta: shape({
      ops: arrayOf(oneOfType([object, string, number, bool]))
    }),
    created: oneOfType([string, instanceOf(Date), number]),
    images: arrayOf(shape({ id: string, src: string }))
  })
};

export default connect(null, {
  notify: actions.notifications.notify,
  onNewsChange: cleanNewsCache
})(AdminPostEditor);
