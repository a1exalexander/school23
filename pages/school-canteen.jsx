/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { SBadge, SButton, SLoader } from '../components';
import Slider from '../components/common/Slider';
import { Header } from '../components/Header';
import { Page } from '../components/Page';
import { db } from '../firebase';
import { more, less } from '../utils/clock';
import { notify } from '../store/modules/notifications/actions';

export const SchoolCanteenPage = () => {
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState([]);

  const { status } = useSelector((state) => state.auth);

  const fetchData = async () => {
    setLoading(true);
    const res = await db.getFood();
    setFood(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getDateString = (date) => {
    return moment(date.toDate()).calendar({
      lastDay: '[Учора]',
      sameDay: '[Сьогодні]',
      nextDay: '[Завтра]',
      lastWeek: '[Минулого] dddd',
      nextWeek: 'dddd',
      sameElse: 'L'
    });
  };

  const getColorBadge = (date) => {
    const dateSting = date.toDate();
    switch (true) {
      case moment().isSame(dateSting, 'day') && less('17:00:00'):
        return 'green';
      case moment().add(1, 'day').isSame(dateSting, 'day') && less('17:00:00'):
        return 'yellow';
      case moment().add(1, 'day').isSame(dateSting, 'day') && more('17:00:00'):
        return 'green';
      case moment().isBefore(dateSting):
        return 'yellow';
      default:
        return 'red';
    }
  };

  const onRemove = async (id) => {
    const ok = window?.confirm('Точно видаляти?');
    if (ok) {
      const res = await db.deleteFood(id);
      if (res) {
        await fetchData();
        notify('success', 'Пост видалено!');
      } else {
        notify('error', 'Помилка при видаленні!');
      }
    }
  };

  return (
    <Page title="Шкільна їдальня" className="SchoolCanteenPage">
      <Header title="Шкільна їдальня" />
      <SLoader loading={loading}>
        <main className="SchoolCanteenPage__grid">
          {food.map(({ id, images, title, date }) => {
            return (
              <div className="SchoolCanteenPage__card" key={id}>
                <SBadge
                  size="large"
                  className="SchoolCanteenPage__badge"
                  color={getColorBadge(date)}
                  label={getDateString(date)}
                />
                <Slider
                  title={title}
                  autoplay={false}
                  className="SchoolCanteenPage__slider"
                  slides={images}
                />
                {status && (
                  <SButton
                    onClick={() => onRemove(id)}
                    type="danger"
                    className="SchoolCanteenPage__remove-btn"
                    size="small"
                  >
                    Видалити
                  </SButton>
                )}
              </div>
            );
          })}
        </main>
      </SLoader>
    </Page>
  );
};

SchoolCanteenPage.defaultProps = {};

SchoolCanteenPage.propTypes = {};

export default SchoolCanteenPage;
