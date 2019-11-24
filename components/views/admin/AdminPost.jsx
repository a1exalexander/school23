import React, { useReducer } from 'react';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SInput, SButton, SRadio } from '../../index';
import 'react-quill/dist/quill.snow.css';
import actions from '../../../store/actions';
import { db } from '../../../firebase';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const reducer = (state, action) => {
  switch (action.type) {
    case 'title':
      return { ...state, title: action.payload };
    case 'text':
      return { ...state, text: action.payload };
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

const AdminPost = ({ notify }) => {
  const [state, dispatch] = useReducer(reducer, { loading: false, title: '', type: 'post', text: '' });

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

    ['clean'] // remove formatting button
  ];
  const modules = {
    toolbar: toolbarOptions
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image'
  ];

  const onDispatch = type => payload => {
    dispatch({ type, payload });
  };

  const isDisabled = [!!state.title, !!state.type, !!state.text].includes(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    onDispatch('loading')(true);
    const res = await db.addPost(state);
    if (res) {
      notify('success', 'Пост успішно опублковано!');
      onDispatch('clean')();
    } else {
      notify('error');
    }
    onDispatch('loading')(false);
  }

  return (
    <div className="admin-post">
      <div className="admin-post__radio-group">
        <SRadio name='post' onChange={onDispatch('type')} checked={state.type} value="post">
          Стаття
        </SRadio>
        <SRadio name='post' onChange={onDispatch('type')} checked={state.type} value="announcement">
          Оголошення
        </SRadio>
      </div>
      <SInput className="admin-post__input" onChange={onDispatch('title')} value={state.title}>
        Головний заголовок статті
      </SInput>
      <ReactQuill
        className="admin-post__input"
        value={state.text}
        onChange={onDispatch('text')}
        modules={modules}
        formats={formats}
      />
      <SButton loading={state.loading} onClick={onSubmit} disabled={isDisabled} label="Опублікувати статтю">
        <span role="img" area-label="post">
          ✎
        </span>
      </SButton>
    </div>
  );
};

AdminPost.propTypes = {
  notify: PropTypes.func,
}

export default connect(null, { notify: actions.notifications.notify })(AdminPost);
