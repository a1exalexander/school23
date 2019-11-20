import React from 'react';
import { Page } from '../components';
import TeacherCard from '../components/views/teachers/TeacherCard';

const Teachers = () => {

  const teachersList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => {
    return <TeacherCard key={String(idx)}/>
  })

  return (
    <Page title="Вчителі школи №23">
      <div className="teachers">
        <header className='teachers__header'>
          <h1 className='teachers__title'>Наші вчителі</h1>
          <p></p>
        </header>
        <ul className='teachers__list'>
          { teachersList }
        </ul>
      </div>
    </Page>
  );
};

export default Teachers;
