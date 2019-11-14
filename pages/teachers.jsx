import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import { Page } from '../components';
import Head from 'next/head';
import TeacherCard from '../components/views/teachers/TeacherCard';

const Teachers = () => {

  const teachersList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => {
    return <TeacherCard key={String(idx)}/>
  })

  return (
    <Page title="Вчителі школи №23">
      <Head>
        <link rel="stylesheet" href="css/uikit.css" />
        <script src="scripts/uikit.min.js"></script>
        <script src="scripts/uikit-icons.min.js"></script>
      </Head>
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
