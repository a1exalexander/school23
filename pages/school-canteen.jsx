/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { SLoader, Pagination, Empty } from '../components';
import { CanteenCard } from '../components/views/canteen/CanteenCard';
import { SModal } from '../components/common/SModal';
import { Header } from '../components/Header';
import { Page } from '../components/Page';
import { db } from '../firebase';
import { notify } from '../store/modules/notifications/actions';
import { ERROR_NOTIFICATION_TIMEOUT, ITEMS_PER_PAGE } from '../constants';
import usePagination from '../hooks/usePagination';
import { YearDivider } from '../components/common/YearDivider';
import { withYearDividers, yearFromDate } from '../utils/groupByYear';

const AdminPostEditor = dynamic(() => import('../components/views/admin/AdminPostEditor'), {
  ssr: false
});

const toUnix = (date) =>
  date && typeof date.toDate === 'function' ? moment(date.toDate()).unix() : 0;

export const SchoolCanteenPage = () => {
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState([]);
  const [editing, setEditing] = useState(null);

  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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

  const onUpdate = async (updated) => {
    const res = await db.updateFood(editing.id, updated);
    if (res) {
      dispatch(notify('success', 'Меню оновлено'));
      setEditing(null);
      await fetchData();
      return true;
    }
    dispatch(
      notify('error', 'Не вдалося зберегти меню. Спробуйте ще раз', ERROR_NOTIFICATION_TIMEOUT)
    );
    return false;
  };

  const onRemove = async (id) => {
    const ok = window?.confirm('Видалити це меню? Цю дію не можна скасувати.');
    if (ok) {
      const res = await db.deleteFood(id);
      if (res) {
        await fetchData();
        dispatch(notify('success', 'Меню видалено'));
      } else {
        dispatch(
          notify('error', 'Не вдалося видалити. Спробуйте ще раз', ERROR_NOTIFICATION_TIMEOUT)
        );
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
                      onEdit={setEditing}
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
        <SModal open={!!editing} onClose={() => setEditing(null)} title="Редагування меню">
          {editing && (
            <AdminPostEditor type="canteen" isUpdate post={editing} onUpdate={onUpdate} />
          )}
        </SModal>
      </div>
    </Page>
  );
};

export default SchoolCanteenPage;
