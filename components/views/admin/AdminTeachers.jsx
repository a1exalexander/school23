import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SInput, SButton } from '../../index';
import actions from '../../../store/actions';
import { storage, db } from '../../../firebase';
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { generateFileName } from '../../../utils';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    case 'files':
      return { ...state, files: [ ...action.payload ] };
    case 'job':
      return { ...state, job: action.payload };
    case 'loading':
      return { ...state, loading: action.payload };
    case 'clean':
      return { ...state, name: '', job: '', files: [] };
    default:
      throw new Error();
  }
};

const AdminTeachers = ({ notify }) => {

  const [state, dispatch] = useReducer(reducer, { loading: false, name: '', job: '', files: [] });

  const onDispatch = type => payload => {
    dispatch({ type, payload });
  };

  const isDisabled = [!!state.name, !!state.job, !!state.files.length].includes(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    onDispatch('loading')(true);
    const { file } = state.files[0];
    const {fileName, url} = await storage.addPhotoTeacher(file, generateFileName(file.name));
    const res = await db.addTeacher({
      name: state.name,
      job: state.job,
      fileName,
      url,
    })
    if (res) {
      notify('success', 'Профіль опубліковано!');
      onDispatch('clean')();
    } else {
      notify('error');
    }
    onDispatch('loading')(false);
  }

  return (
    <div className="admin-teachers">
      <div className="admin-teachers__new">
        <SInput className="admin-teachers__input" onChange={onDispatch('name')} value={state.name}>
          ПІБ
        </SInput>
        <SInput className="admin-teachers__input" onChange={onDispatch('job')} value={state.job}>
          Посада
        </SInput>
        <div className="admin-teachers__input admin-teachers__input--file">
          <FilePond className='admin-teachers__file' files={state.files} allowMultiple={false} onupdatefiles={onDispatch('files')} labelIdle={`Перетягни фото сюди або <br/><span class="filepond--label-action"> обери файл </span>`}/>
        </div>
        <SButton loading={state.loading} onClick={onSubmit} disabled={isDisabled} label="Опублікувати">
          <span role="img" area-label="post">
            ✎
          </span>
        </SButton>
      </div>
    </div>
  );
};

AdminTeachers.propTypes = {
  notify: PropTypes.func,
}

export default connect(null, { notify: actions.notifications.notify })(AdminTeachers);
