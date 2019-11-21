import React, { useState } from 'react';
import { Page, SBadge, SRadioSlider } from '../components';
import Link from 'next/link';
import LawPopup from '../components/views/law/LawPopup';
import { trancate } from '../utils';

const text = 'Тестове описання нормативно-правового акту Тестове описання нормативно-правового акту Тестове описання нормативно-правового акту Тестове описання нормативно-правового акту Тестове описання нормативно-правового акту Тестове описання нормативно-правового акту Тестове описання нормативно-правового акту Тестове описання нормативно-правового акту Тестове описання нормативно-правового акту Тестове описання нормативно-правового акту Тестове описання нормативно-правового акту Тестове описання нормативно-правового акту';

const Teachers = () => {

  const [state, setState] = useState({ radio: 'Усі НП акти', law: null });

  const toggleLaw = (law) => (e) => {
    e.preventDefault();
    setState(ps => ({ ...ps, law }));
  }

  const toggleSlider = (radio) => setState(ps => ({ ...ps, radio }))

  const teachersList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => {
    return (
      <li key={String(idx)} className='law__item'>
        <a className='law__name-link' href='#' onClick={toggleLaw(item)}>
          <h2 className='law__name'>{'Тестова назва нормативно-правового акту'}</h2>
        </a>
        <div className="law__info">
          <SBadge className='law__badge' color='red' label='Закон'/>
          <span className='law__date'>від {'22.11.2019'}</span>
        </div>
        <p className='law__description is-desktop'>{trancate(text, 320)}</p>
        <p className='law__description is-mobile'>{trancate(text, 120)}</p>
      </li>
    );
  })

  return (
    <Page title="Нормативно-правові акти">
      <LawPopup onClose={toggleLaw(null)} inProp={!!state.law}/>
      <div className="law">
        <h1 className='law__title'>Нормативно-правові акти</h1>
        <div className="law__navigation">
          <SRadioSlider onChange={toggleSlider} name='law' checked={state.radio} tabs={['Усі НП акти', 'Закони', 'Накази']}/>
        </div>
        <ul className='law__list'>
          { teachersList }
        </ul>
      </div>
    </Page>
  );
};

export default Teachers;
