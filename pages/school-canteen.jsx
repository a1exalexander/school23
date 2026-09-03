/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { SLoader, Pagination, Empty } from '../components';
import { CanteenCard } from '../components/views/canteen/CanteenCard';
import { Header } from '../components/Header';
import { Page } from '../components/Page';
import { db } from '../firebase';
import { notify } from '../store/modules/notifications/actions';
import { ITEMS_PER_PAGE } from '../constants';
import usePagination from '../hooks/usePagination';
import { YearDivider } from '../components/common/YearDivider';
import { withYearDividers, yearFromDate } from '../utils/groupByYear';

const toUnix = (date) =>
  date && typeof date.toDate === 'function' ? moment(date.toDate()).unix() : 0;

export const SchoolCanteenPage = () => {
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState([]);

  const { status } = useSelector((state) => state.auth);

  const {
    currentPage,
    totalCount,
    totalPages,
    pageItems,
    hasItems,
    isLastPage,
    goToPage
  } = usePagination(food, ITEMS_PER_PAGE);

  const fetchData = async () => {
    setLoading(true);
    const res = await db.getFood();
    const sorted = Array.isArray(res)
      ? [...res].sort((a, b) => toUnix(b.date) - toUnix(a.date))
      : [];
    setFood(sorted);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <div className="Page__inner">
        <Header
          title="Шкільна їдальня"
          description="Меню шкільної їдальні на кожен день. Натисніть на фото, щоб роздивитись його ближче."
        >
          <div className="SchoolCanteenPage__legend" aria-hidden="true">
            <span className="SchoolCanteenPage__legend-item _today">сьогодні</span>
            <span className="SchoolCanteenPage__legend-item _upcoming">найближчі дні</span>
            <span className="SchoolCanteenPage__legend-item _past">минулі</span>
          </div>
        </Header>
        <SLoader loading={loading}>
          {food.length || loading ? (
            <>
              <div className="SchoolCanteenPage__grid">
                {withYearDividers(pageItems, (item) => yearFromDate(item?.date)).map((entry) =>
                  entry.kind === 'divider' ? (
                    <YearDivider key={entry.key} year={entry.year} />
                  ) : (
                    <CanteenCard
                      key={entry.item.id}
                      item={entry.item}
                      canRemove={!!status}
                      onRemove={onRemove}
                    />
                  )
                )}
              </div>
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalCount={totalCount}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={goToPage}
                  hasItems={hasItems}
                  isLastPage={isLastPage}
                  loading={loading}
                />
              )}
            </>
          ) : (
            <Empty
              text="Меню поки не додано"
              hint="Фото меню з'являться тут, щойно їх опублікують."
            />
          )}
        </SLoader>
      </div>
    </Page>
  );
};

export default SchoolCanteenPage;
