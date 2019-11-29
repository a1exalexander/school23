import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SButton from '../../common/buttons/SButton';
import { actions } from '../../../store/modules/teachers';

const TeacherCard = ({ teacher, isAuth, deleteTeacher, className = '' }) => {

  const [state, setState] = useState(false);

  const deleteProfile = async () => {
    setState(true);
    await deleteTeacher(teacher);
    setState(false);
  }

  return (
    <li className={classNames("teacher-card", className)}>
      {isAuth && <SButton loading={state} onClick={deleteProfile} className="teacher-card__delete" size='small' type='danger'>Видалити</SButton>}
      <div className="teacher-card__image-wrapper">
          <img className='teacher-card__image' src={teacher.url} alt=""/>
      </div>
      <div className="teacher-card__body">
        <h3 className="teacher-card__name">{teacher.name}</h3>
        <p className="teacher-card__description">{teacher.job}</p>
      </div>
    </li>
  )
};

TeacherCard.propTypes = {
  className: PropTypes.string,
  teacher: PropTypes.object,
  deleteTeacher: PropTypes.func,
  isAuth: PropTypes.isAuth,
}
export default connect(({ auth: { status } }) => ({ isAuth: status }), {
  deleteTeacher: actions.deleteTeacher
})(TeacherCard);
