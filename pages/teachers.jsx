import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Page, SLoader, Empty } from '../components';
import TeacherCard from '../components/views/teachers/TeacherCard';
import { actions } from '../store/modules/teachers';

const Teachers = ({ teachers, loading, fetchData, isEmpty }) => {

  useEffect(() => {
    if (process.browser) fetchData()
  }, [])

  const teachersList = teachers.map((item) => {
    return <TeacherCard teacher={item} key={item.id} />;
  });

  return (
    <Page title="Вчителі школи №23">
      <div className="teachers">
        <header className="teachers__header">
          <h1 className="teachers__title">Наші вчителі</h1>
        </header>
        {isEmpty && !loading ? (<SLoader className='teachers__loader' fluid loading={isEmpty || loading}>
          <ul className="teachers__list">{teachersList}</ul>
        </SLoader>) : <Empty />}
      </div>
    </Page>
  );
};

Teachers.propTypes = {
  teachers: PropTypes.array,
  fetchData: PropTypes.func,
  isEmpty: PropTypes.bool,
  loading: PropTypes.bool
};

export default connect(({ teachers: { list, loading } }) => ({ loading, teachers: list, isEmpty: !list.length && !loading }), {
  fetchData: actions.fetchData
})(Teachers);
