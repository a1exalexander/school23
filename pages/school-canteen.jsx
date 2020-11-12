import React, { useEffect, useState } from 'react';
import { SLoader } from '../components';
import Slider from '../components/common/Slider';
import { Header } from '../components/Header';
import { Page } from '../components/Page';
import { db } from '../firebase';

export const SchoolCanteenPage = () => {
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await db.getFood();
      setFood(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Page title="Шкільна їдальня" className="SchoolCanteenPage">
      <Header title="Шкільна їдальня" />
      <SLoader loading={loading}>
        <main className="SchoolCanteenPage__grid">
          <div className="SchoolCanteenPage__card">
            <Slider className="SchoolCanteenPage__slider" slides={[]} />
          </div>
        </main>
      </SLoader>
    </Page>
  );
};

SchoolCanteenPage.defaultProps = {};

SchoolCanteenPage.propTypes = {};

export default SchoolCanteenPage;
