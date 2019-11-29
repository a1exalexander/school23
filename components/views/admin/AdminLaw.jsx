import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SInput, SButton } from '../../index';
import actions from '../../../store/actions';
import { storage, db } from '../../../firebase';
import "filepond/dist/filepond.min.css";
import { FilePond } from "react-filepond";

const reducer = (state, action) => {
  switch (action.type) {
    case 'title':
      return { ...state, title: action.payload };
    case 'files':
      return { ...state, files: [ ...action.payload ] };
    case 'type':
      return { ...state, type: action.payload };
    case 'loading':
      return { ...state, loading: action.payload };
    case 'clean':
      return { ...state, title: '', type: '', files: [] };
    default:
      throw new Error();
  }
};

const AdminLaw = ({ notify }) => {
  const [state, dispatch] = useReducer(reducer, { loading: false, title: '', type: '', files: [] });

  const onDispatch = type => payload => {
    dispatch({ type, payload });
  };

  const isDisabled = [!!state.title, !!state.type, !!state.files.length].includes(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    onDispatch('loading')(true);
    const {fileName, url} = await storage.addDocument(state.files[0].file);
    const res = await db.addDocument({
      title: state.title,
      type: state.type,
      url,
      fileName,
    })
    if (res) {
      notify('success', 'Документ опубліковано!');
      onDispatch('clean')();
    } else {
      notify('error');
    }
    onDispatch('loading')(false);
  }

  return (
    <div className="admin-law">
      <SInput maxLength={20} className="admin-law__input admin-law__input--type" onChange={onDispatch('type')} value={state.type}>
        Тип нормативно-правового акту (Закон, Наказ МОН, Наказ УОН, Наказ, інше)
      </SInput>
      <SInput className="admin-law__input" onChange={onDispatch('title')} value={state.title}>
        Головний заголовок статті
      </SInput>
      <div className="admin-law__input admin-law__input--file">
        <FilePond className='admin-law__file' files={state.files} allowMultiple={false} onupdatefiles={onDispatch('files')} labelIdle={`Перетягни файл сюди або <br/><span class="filepond--label-action"> обери файл </span>`}/>
      </div>
      <SButton loading={state.loading} onClick={onSubmit} disabled={isDisabled} label="Опублікувати">
        <span role="img" area-label="post">
          ✎
        </span>
      </SButton>
    </div>
  );
};

AdminLaw.propTypes = {
  notify: PropTypes.func,
}

export default connect(null, { notify: actions.notifications.notify })(AdminLaw);
