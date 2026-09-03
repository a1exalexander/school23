import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PublicCard } from '../../components/views/public/PublicCard';
import { SLoader, Empty, Pagination } from '../../components';
import { SSearch } from '../../components/common/form/SSearch';
import { getters, actions } from '../../store/modules/public';
import { Page } from '../../components/Page';
import { Header } from '../../components/Header';
import { ITEMS_PER_PAGE } from '../../constants';
import usePagination from '../../hooks/usePagination';
import { YearDivider } from '../../components/common/YearDivider';
import { withYearDividers, yearFromUnix } from '../../utils/groupByYear';

const Public = () => {
  const [search, setSearch] = useState('');

  const { loading, pages = [] } = useSelector((store) => store.publicInfo || {});

  const dispatch = useDispatch();

  const filteredPages = useMemo(() => getters.filteredPages(pages)(search), [pages, search]);

  const {
    currentPage,
    totalCount,
    totalPages,
    pageItems,
    hasItems,
    isLastPage,
    goToPage,
    resetPage
  } = usePagination(filteredPages, ITEMS_PER_PAGE);

  const handleChange = (value) => {
    setSearch(value);
    resetPage();
  };

  useEffect(() => {
    dispatch(actions.getPublicInfo());
  }, [dispatch]);

  const isSearching = search.trim().length > 0;

  return (
    <Page title="Публічна інформація" className="public">
      <div className="Page__inner">
        <Header
          title="Публічна інформація"
          description="Установчі документи, звіти та інша інформація про діяльність гімназії, доступ до якої гарантує Закон України «Про освіту»."
        >
          <SSearch value={search} onChange={handleChange} placeholder="Пошук документів..." />
        </Header>
        <SLoader loading={loading}>
          {filteredPages.length || loading ? (
            <div className="public__grid-wrapper">
              {isSearching && <p className="public__count">{`Знайдено: ${totalCount}`}</p>}
              <div className="public__grid">
                {withYearDividers(pageItems, (post) => yearFromUnix(post?.created)).map((entry) =>
                  entry.kind === 'divider' ? (
                    <YearDivider key={entry.key} year={entry.year} />
                  ) : (
                    <PublicCard key={entry.item.id} post={entry.item} className="public__card" />
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
            </div>
          ) : (
            <Empty
              text={isSearching ? 'Нічого не знайдено' : 'Документи поки відсутні'}
              hint={isSearching ? 'Спробуйте інший пошуковий запит.' : undefined}
            />
          )}
        </SLoader>
      </div>
    </Page>
  );
};

export default Public;
