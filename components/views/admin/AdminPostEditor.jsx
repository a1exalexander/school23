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
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import OutsideClickHandler from 'react-outside-click-handler';
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
import { getImageTooLargeMessage, isFileTooLarge, isObject, isString } from '../../../utils';

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
  date: null
};

// What every kind of entry is, where it shows up on the site and what it needs
const TYPE_INFO = {
  post: {
    hint: 'Новина зʼявиться першою на сторінці «Новини». Потрібні заголовок і текст або фото.',
    titleLabel: 'Заголовок новини',
    publish: 'Опублікувати новину',
    success: 'Новину опубліковано!'
  },
  page: {
    hint:
      'Документ або сторінка для розділу «Публічна інформація» (звіти, положення, кошториси). Потрібні заголовок і текст або фото.',
    titleLabel: 'Назва документа',
    publish: 'Опублікувати документ',
    success: 'Документ опубліковано!'
  },
  activity: {
    hint:
      'Матеріал для розділу «Діяльність гімназії»: гуртки, проєкти, самоврядування. Потрібні заголовок і текст або фото.',
    titleLabel: 'Заголовок',
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
      debug: true
    }
  };

  constructor() {
    super();
    this.state = { ...initState, date: new Date(), modules: this.modules };
    this.quillRef = null;
    this.reactQuillRef = null;
    this.tooLargeImages = [];
    this.tooLargeImagesTimer = null;
  }

  componentDidMount() {
    const { post = initState } = this.props;
    const payload = {
      title: post?.title,
      delta: post?.delta,
      text: post?.text,
      type: post?.type || initState.type,
      iframe: post?.iframe,
      video: post?.video || '',
      oldImages: post?.images
    };
    this.onDispatch('init')(payload);
    this.setState((prevState) => ({
      ...prevState,
      ...payload,
      modules: this.modules
    }));
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  componentWillUnmount() {
    clearTimeout(this.tooLargeImagesTimer);
  }

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
  };

  handleChange = () => {
    if (this.quillRef) {
      const delta = this.quillRef.getContents();
      const cfg = {};
      const converter = new QuillDeltaToHtmlConverter(delta.ops, cfg);
      const conerted = converter.convert();
      const text = conerted.replace(/(<([^>]+)>)/gi, '').trim();
      this.setState((prevState) => {
        return {
          ...prevState,
          text,
          delta: { ...delta }
        };
      });
    }
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
      post.delta = state.delta;
      post.text = state.text;
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
      // Firebase Storage refuses images heavier than 2 MB,
      // so all of the oversized ones are reported at once, before any upload starts
      const tooLargeImages = images.filter((image) => isFileTooLarge(image?.file));
      if (tooLargeImages.length) {
        notify(
          'error',
          getImageTooLargeMessage(tooLargeImages.map((image) => image?.file)),
          ERROR_NOTIFICATION_TIMEOUT
        );
        onDispatch('loading')(false);
        return;
      }
      try {
        const savedImages = await Promise.all(
          images.map(async (file) => {
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
      await onUpdate(post);
    } else {
      const res = await db[http](post);
      if (res) {
        if (http === 'addPost') onNewsChange();
        notify('success', messageSuccess);
        onDispatch('clean')();
        Router.push(route);
      } else {
        notify('error', messages.POST_SAVE_ERROR, ERROR_NOTIFICATION_TIMEOUT);
      }
    }
    onDispatch('loading')(false);
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
      notify('error', getImageTooLargeMessage(this.tooLargeImages), ERROR_NOTIFICATION_TIMEOUT);
      this.tooLargeImages = [];
    }, 100);
  };

  /**
   * Firebase Storage does not accept images heavier than 2 MB,
   * so an oversized file is rejected right away with a friendly toast
   * instead of a failed upload after the "Опублікувати" click.
   */
  beforeAddFile = (item) => {
    if (isFileTooLarge(item?.file)) {
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
        if (!state.images?.length) return 'Додайте хоча б одне фото меню';
        return null;
      }
      if (!state.title?.trim()) return 'Додайте заголовок';
      const hasImages = !!state.images?.length || !!state.oldImages?.length;
      if (!hasImages && !state.text?.trim()) return 'Додайте текст або фото';
      return null;
    };
    const missing = getMissing();

    return (
      <div className="admin-post">
        {!props.isUpdate && <p className="admin-post__hint">{info.hint}</p>}
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
        <SInput className="admin-post__input" onChange={onDispatch('title')} value={state.title}>
          {isCanteen ? (
            info.titleLabel
          ) : (
            <span>
              <sup>*</sup>
              {info.titleLabel}
            </span>
          )}
        </SInput>
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
            labelIdle={`Перетягніть фото сюди або <br/><span class="filepond--label-action">оберіть файли</span><br/><span class="filepond--label-hint">JPG або PNG, до ${MAX_IMAGE_SIZE_MB} МБ кожне, не більше 10 фото</span>`}
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
        {!isCanteen && (
          <div className="admin-post__field">
            <div className="admin-post__label-row">
              <span className="admin-post__label">Текст</span>
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
              placeholder="Напишіть текст. Фото можна вставити просто в текст або додати вище."
            />
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
          {missing && <span className="admin-post__missing">{missing}</span>}
        </div>
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
