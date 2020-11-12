import React from 'react';
import { Header } from '../components/Header';
import { Page } from '../components/Page';

export const SchoolCanteenPage = () => {
  return (
    <Page title="Шкільна їдальня">
      <Header title="Шкільна їдальня" />
      <main className="SchoolCanteenPage">content</main>
    </Page>
  );
};

SchoolCanteenPage.defaultProps = {};

SchoolCanteenPage.propTypes = {};

export default SchoolCanteenPage;
