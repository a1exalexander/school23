import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  arrayOf,
  bool,
  func,
  instanceOf,
  number,
  object,
  oneOfType,
  shape,
  string
} from 'prop-types';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module';
import { ImageDrop } from 'quill-image-drop-module';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import Router from 'next/router';
import { SInput, SButton, SRadio } from '../../index';
import actions from '../../../store/actions';
import { db } from '../../../firebase';
import { routes } from '../../../constants';

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);

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

  ['clean'] // remove formatting button,
  // [
  //   {
  //     handlers: {
  //       image: this.imageHandler,
  //     },
  //   },
  // ],
];
const modules = {
  toolbar: toolbarOptions,
  imageResize: {},
  imageDrop: true
};
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
    case 'clean':
      return { ...state, title: '', text: '' };
    default:
      throw new Error();
  }
};

const initState = { loading: false, title: '', type: 'post', text: '', delta: { ops: [] } };

class AdminPost extends Component {
  constructor() {
    super();
    this.state = { ...initState };
    this.quillRef = null;
    this.reactQuillRef = null;
  }

  componentDidMount() {
    const { post = initState } = this.props;
    this.onDispatch('init')({
      title: post.title,
      delta: post.delta,
      text: post.text,
      type: post.type
    });
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
    const { notify, isUpdate, onUpdate } = this.props;
    const { state, onDispatch } = this;
    const post = { title: state.title, delta: state.delta, text: state.text, type: state.type };
    if (isUpdate) {
      onDispatch('loading')(true);
      onUpdate(post);
    } else {
      e.preventDefault();
      onDispatch('loading')(true);
      const res = await db.addPost(post);
      if (res) {
        notify('success', 'Пост успішно опублковано!');
        onDispatch('clean')();
        Router.push(routes.NEWS);
      } else {
        notify('error');
      }
      onDispatch('loading')(false);
    }
  };

  render() {
    const { state, onDispatch, handleChange, _onSubmit } = this;

    const isDisabled = [!!state.title, !!state.type, !!state.text].includes(false);

    return (
      <div className="admin-post">
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
        <SInput className="admin-post__input" onChange={onDispatch('title')} value={state.title}>
          Головний заголовок статті
        </SInput>
        <ReactQuill
          ref={(el) => {
            this.reactQuillRef = el;
          }}
          className="admin-post__input"
          value={state.delta}
          onChange={handleChange}
          modules={modules}
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

AdminPost.defaultProps = {
  notify: func,
  isUpdate: false,
  onUpdate: () => undefined,
  post: undefined
};

AdminPost.propTypes = {
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

export default connect(null, { notify: actions.notifications.notify })(AdminPost);
