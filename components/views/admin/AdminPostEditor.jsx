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
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import Router from 'next/router';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { SInput, SButton, SRadio } from '../../index';
import actions from '../../../store/actions';
import { db, storage } from '../../../firebase';
import { routes } from '../../../constants';

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageCompress', ImageCompress);

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
    case 'clean':
      return { ...state, title: '', text: '' };
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
  iframe: ''
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
    this.state = { ...initState, modules: this.modules };
    this.quillRef = null;
    this.reactQuillRef = null;
  }

  componentDidMount() {
    const { post = initState } = this.props;
    const payload = {
      title: post?.title,
      delta: post?.delta,
      text: post?.text,
      type: post?.type,
      iframe: post?.iframe,
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

  onDispatch = (type) => (payload) => {
    this.setState((prevState) => reducer(prevState, { type, payload }));
  };

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    const editor = this.reactQuillRef.getEditor();
    this.quillRef = this.reactQuillRef.makeUnprivilegedEditor(editor);
  };

  handleChange = () => {
    if (this.quillRef) {
      const delta = this.quillRef.getContents();
      const cfg = {};
      const converter = new QuillDeltaToHtmlConverter(delta.ops, cfg);
      const text = converter.convert();
      this.setState((prevState) => {
        return {
          ...prevState,
          text,
          delta: { ...delta }
        };
      });
    }
  };

  _onSubmit = async (e) => {
    const { notify, isUpdate, onUpdate, type } = this.props;
    const {
      state,
      state: { images, oldImages = [] },
      onDispatch
    } = this;
    const post = {
      title: state.title,
      delta: state.delta,
      text: state.text,
      iframe: state.iframe,
      images: [...oldImages]
    };
    let http = 'addPost';
    let messageSuccess = 'Пост успішно опублковано!';
    let route = routes.NEWS;

    if (type === 'page') {
      http = 'addPublicInfo';
      messageSuccess = 'Сторінку успішно опублковано!';
      route = routes.PUBLIC_INFO;
    }
    if (type === 'post') {
      post.type = state.type;
    }
    onDispatch('loading')(true);
    if (images.length) {
      const savedImages = await Promise.all(
        images.map(async (file) => {
          const image = await storage.addPostImage(file);
          return image;
        })
      );
      post.images = [...oldImages, ...savedImages];
    }
    if (isUpdate) {
      onUpdate(post);
    } else {
      e.preventDefault();
      const res = await db[http](post);
      if (res) {
        notify('success', messageSuccess);
        onDispatch('clean')();
        Router.push(route);
      } else {
        notify('error', 'Упс! Щось сталося( Мабуть картинка занадто важка');
      }
    }
    onDispatch('loading')(false);
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

    const isDisabled = [
      !!state.title,
      props.type !== 'post' || !!state.type,
      !!state.text || !!state?.images?.length || !!state?.iframe
    ].includes(false);

    return (
      <div className="admin-post">
        {props.type === 'post' && (
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
        )}
        <SInput className="admin-post__input" onChange={onDispatch('title')} value={state.title}>
          Головний заголовок статті
        </SInput>
        <SInput className="admin-post__input" onChange={onDispatch('iframe')} value={state.iframe}>
          Посилання на сайт, який буде інтегровано на сторінці
        </SInput>
        <FilePond
          className="admin-post__images"
          files={state.images}
          allowMultiple
          acceptedFileTypes={['image/png', 'image/jpg', 'image/jpeg']}
          maxFiles={10}
          onupdatefiles={onDispatch('images')}
          labelIdle={`Перетягни фото сюди або <br/><span class="filepond--label-action"> обери файлы </span>`}
        />
        {!!state?.oldImages?.length && (
          <ul className="admin-post__images-old">
            {state?.oldImages?.map(({ id, src }) => (
              <li key={id} className="admin-post__old-image-item">
                <SButton
                  onClick={() => this.onRemoveImage(id)}
                  className="admin-post__images-remove-btn"
                  type="danger"
                  size="small"
                >
                  Remove
                </SButton>
                <img src={src} alt="" />
              </li>
            ))}
          </ul>
        )}
        <ReactQuill
          ref={(el) => {
            this.reactQuillRef = el;
          }}
          className="admin-post__input"
          value={state.delta}
          onChange={handleChange}
          modules={state.modules}
          formats={formats}
        />
        <SButton
          loading={state.loading}
          onClick={_onSubmit}
          disabled={isDisabled}
          label="Опублікувати статтю"
        >
          <span role="img" area-label="post">
            ✎
          </span>
        </SButton>
      </div>
    );
  }
}

AdminPostEditor.defaultProps = {
  notify: func,
  isUpdate: false,
  onUpdate: () => undefined,
  post: undefined,
  type: 'post'
};

AdminPostEditor.propTypes = {
  type: oneOf(['post', 'page']),
  notify: func,
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

export default connect(null, { notify: actions.notifications.notify })(AdminPostEditor);
