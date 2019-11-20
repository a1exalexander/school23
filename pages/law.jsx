import React from 'react';
import { Page, SBadge } from '../components';

const Teachers = () => {

  const teachersList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => {
    return (
      <li key={String(idx)} className='law__item'>
        <h2 className='law__name'>{'Тестова назва нормативно-правового акту'}</h2>
        <SBadge className='law__badge' color='red' label='Закон'/>
        <p className='law__descriptio'></p>
      </li>
    );
  })

  return (
    <Page title="Нормативно-правові акти">
      <div className="law">
        <h1 className='law__title'>Нормативно-правові акти</h1>
        <ul className='law__list'>
          { teachersList }
        </ul>
      </div>
    </Page>
  );
};

export default Teachers;
