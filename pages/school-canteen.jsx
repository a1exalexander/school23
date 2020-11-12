import React from 'react';
import Slider from '../components/common/Slider';
import { Header } from '../components/Header';
import { Page } from '../components/Page';

export const SchoolCanteenPage = () => {
  return (
    <Page title="Шкільна їдальня" className="SchoolCanteenPage">
      <Header title="Шкільна їдальня" />
      <main className="SchoolCanteenPage__grid">
        <div className="SchoolCanteenPage__card">
          <Slider className="SchoolCanteenPage__slider" slides={[]} />
        </div>
      </main>
    </Page>
  );
};

SchoolCanteenPage.defaultProps = {};

SchoolCanteenPage.propTypes = {};

export default SchoolCanteenPage;
