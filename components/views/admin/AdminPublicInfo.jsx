import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bool, func, object } from 'prop-types';
import { SInput, SButton } from '../../index';
import 'react-quill/dist/quill.snow.css';
import actions from '../../../store/actions';
import { db } from '../../../firebase';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module';
import { ImageDrop } from 'quill-image-drop-module';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import Router from 'next/router';
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

  ['clean'], // remove formatting button
];
const modules = {
  toolbar: toolbarOptions,
  imageResize: {},
  imageDrop: true,
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
  'color',
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
    case 'loading':
      return { ...state, loading: action.payload };
    case 'clean':
      return { ...state, title: '', text: '' };
    default:
      throw new Error();
  }
};

const initState = { loading: false, title: '', text: '', delta: { ops: [] } };

class AdminPublicInfo extends Component {
  state = { ...initState };

  quillRef = null;
  reactQuillRef = null;

  _onDispatch = (type) => (payload) => {
    this.setState((prevState) => reducer(prevState, { type, payload }));
  };

  componentDidMount() {
    const { post = initState } = this.props;
    this._onDispatch('init')({
      title: post.title,
      delta: post.delta,
      text: post.text,
    });
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    const editor = this.reactQuillRef.getEditor();
    this.quillRef = this.reactQuillRef.makeUnprivilegedEditor(editor);
  };

  handleChange = (e) => {
    if (this.quillRef) {
      const delta = this.quillRef.getContents();
      const cfg = {};
      const converter = new QuillDeltaToHtmlConverter(delta.ops, cfg);
      const text = converter.convert();
      this.setState((prevState) => {
        return {
          ...prevState,
          text,
          delta: { ...delta },
        };
      });
    }
  };

  _onSubmit = async (e) => {
    const { notify, isUpdate, onUpdate } = this.props;
    const { state, _onDispatch } = this;
    const post = { title: state.title, delta: state.delta, text: state.text };
    if (isUpdate) {
      _onDispatch('loading')(true);
      onUpdate(post);
    } else {
      e.preventDefault();
      _onDispatch('loading')(true);
      const res = await db.addPublicInfo(post);
      if (res) {
        notify('success', 'Сторінку успішно опублковано!');
        _onDispatch('clean')();
        Router.push(routes.PUBLIC_INFO);
      } else {
        notify('error', 'Упс! Щось сталося( Мабуть картинка занадто важка');
      }
      _onDispatch('loading')(false);
    }
  };

  render() {
    const { state, _onDispatch, handleChange, _onSubmit } = this;

    const isDisabled = [!!state.title, !!state.text].includes(false);

    return (
      <div className="admin-post">
        <SInput className="admin-post__input" onChange={_onDispatch('title')} value={state.title}>
          Заголовок сторінки
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

AdminPublicInfo.propTypes = {
  notify: func,
  isUpdate: bool,
  onUpdate: func,
  post: object,
};

export default connect(null, { notify: actions.notifications.notify })(AdminPublicInfo);
