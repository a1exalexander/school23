import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { Page } from '../../components';
import { columnsModel } from './model';

const weekDays = ['Понеділок', 'Вівторок', 'середа', 'четверг', "п'ятниця", 'субота'];

export const LessonListCell = () => {
  return (
    <ul>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        return (
          <li style={{ whiteSpace: 'nowrap' }}>
            {i}
            -й Урок
          </li>
        );
      })}
    </ul>
  );
};

export const LessonsCell = () => {
  return (
    <ul>
      {[1, 2, 3, 4, 5, 6, 7, 8].map(() => {
        return <li style={{ whiteSpace: 'nowrap' }}>Зарубіжна литература</li>;
      })}
    </ul>
  );
};

const data = weekDays.map((day) => {
  const classes = new Map(
    columnsModel
      .filter((col) => !['name', 'lessons'].includes(col?.key))
      .map((cell) => {
        return (cell?.children || []).map((subcell) => [subcell?.dataIndex, <LessonsCell />]);
      })
      .flat()
  );
  return {
    key: day,
    name: day,
    lessons: <LessonListCell />,
    ...Object.fromEntries(classes)
  };
});

const Schedule = () => {
  const [columns, setColumns] = useState(columnsModel);

  useEffect(() => {
    setColumns(columnsModel);
  }, []);

  return (
    <Page title="Розклад уроків" description="Розклад уроків Кременчуцької гімназії №23">
      <div className="Schedule">
        <header className="Schedule__header">
          <h1 className="Schedule__title">Розклад уроків</h1>
          <h2 className="Schedule__description">Станом на 20 жовтня 2020</h2>
        </header>
        <Table
          pagination={false}
          bordered
          columns={columns}
          dataSource={data}
          scroll={{ x: 'calc(100vw - 240px)', y: 'calc(100vh - 277px)' }}
        />
      </div>
    </Page>
  );
};

export default Schedule;
