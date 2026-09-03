import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityCard } from '../../components/views/activty/ActivityCard';
import { SLoader, Empty, Pagination } from '../../components';
import { SSearch } from '../../components/common/form/SSearch';
import { getters, actions } from '../../store/modules/activity';
import { Page } from '../../components/Page';
import { Header } from '../../components/Header';
import { ITEMS_PER_PAGE } from '../../constants';
import usePagination from '../../hooks/usePagination';

const Activity = () => {
  const [search, setSearch] = useState('');

  const { loading, pages = [] } = useSelector((store) => store.activity || {});

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
    dispatch(actions.getActivityPosts());
  }, [dispatch]);

  const isSearching = search.trim().length > 0;

  return (
    <Page title="Діяльність гімназії" className="public">
      <div className="Page__inner">
        <Header
          title="Діяльність гімназії"
          description="Гуртки, проєкти, учнівське самоврядування та інші напрями роботи гімназії."
        >
          <SSearch value={search} onChange={handleChange} placeholder="Пошук..." />
        </Header>
        <SLoader loading={loading}>
          {filteredPages.length || loading ? (
            <div className="public__grid-wrapper">
              {isSearching && <p className="public__count">{`Знайдено: ${totalCount}`}</p>}
              <div className="public__grid">
                {pageItems.map((post) => (
                  <ActivityCard key={post.id} post={post} className="public__card" />
                ))}
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
              text={isSearching ? 'Нічого не знайдено' : 'Матеріали поки відсутні'}
              hint={isSearching ? 'Спробуйте інший пошуковий запит.' : undefined}
            />
          )}
        </SLoader>
      </div>
    </Page>
  );
};

export default Activity;
