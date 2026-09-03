/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityCard } from '../../components/views/activty/ActivityCard';
import { SLoader, Empty, Pagination } from '../../components';
import { IconSearch } from '../../components/common/icons';
import { getters, actions } from '../../store/modules/activity';
import { Page } from '../../components/Page';
import { Header } from '../../components/Header';
import { ITEMS_PER_PAGE } from '../../constants';
import usePagination from '../../hooks/usePagination';

const Activity = () => {
  const [state, setState] = useState('');

  const { loading, pages = [] } = useSelector((store) => store.activity || {});

  const dispatch = useDispatch();

  const filteredPages = useMemo(() => getters.filteredPages(pages)(state), [pages, state]);

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

  const renderPagination = () =>
    totalPages > 1 ? (
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={goToPage}
        hasItems={hasItems}
        isLastPage={isLastPage}
        loading={loading}
      />
    ) : null;

  const handleChange = (e) => {
    const { value } = e.target;
    setState(value);
    resetPage();
  };

  useEffect(() => {
    dispatch(actions.getActivityPosts());
  }, [dispatch]);

  return (
    <Page title="Діяльність Гімназії" className="public">
      <Header title="Діяльність Гімназії" className="_mobile-pb">
        <label className="public__input-wrapper">
          <input
            value={state}
            onChange={handleChange}
            className="public__input"
            placeholder="Пошук..."
            type="text"
          />
          <IconSearch className="public__input-icon" />
        </label>
      </Header>
      <SLoader loading={loading}>
        {pages.length || loading ? (
          <div className="public__grid-wrapper">
            {renderPagination()}
            <div className="public__grid">
              {pageItems.map((post, idx) => {
                return (
                  <ActivityCard key={post.id} idx={idx} post={post} className="public__card" />
                );
              })}
            </div>
            {renderPagination()}
          </div>
        ) : (
          <Empty />
        )}
      </SLoader>
    </Page>
  );
};

export default Activity;
