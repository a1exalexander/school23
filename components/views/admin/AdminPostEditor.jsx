import React, { PureComponent } from 'react';
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
import 'react-quill/dist/quill.snow.css';
import ImageCompress from 'quill-image-compress';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module';
import { ImageDrop } from 'quill-image-drop-module';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import Router from 'next/router';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
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
  ['blockquote', 'code-block'],
  ['link', 'image'],
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],

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
  images: []
};

class AdminPostEditor extends PureComponent {
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
      title: post.title,
      delta: post.delta,
      text: post.text,
      type: post.type
    };
    this.onDispatch('init')(payload);
    this.setState((prevState) => ({ ...prevState, ...payload, modules: this.modules }));
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
      state: { images },
      onDispatch
    } = this;
    const post = { title: state.title, delta: state.delta, text: state.text, images: [] };
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
      post.images = [...savedImages];
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

  render() {
    const { state, onDispatch, handleChange, _onSubmit, props } = this;

    const isDisabled = [!!state.title, !!state.type, !!state.text].includes(false);

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
        <FilePond
          className="admin-post__images"
          files={state.images}
          allowMultiple
          acceptedFileTypes={['image/png', 'image/jpg', 'image/jpeg']}
          maxFiles={10}
          onupdatefiles={onDispatch('images')}
          labelIdle={`Перетягни фото сюди або <br/><span class="filepond--label-action"> обери файлы </span>`}
        />
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
