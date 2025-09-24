/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import NewsCard from '../../components/views/news/NewsCard';
import { actions } from '../../store/modules/news';
import { Empty, SLoader, Pagination } from '../../components';
import { Page } from '../../components/Page';
import { IconSearch } from '../../components/common/icons';
import { Header } from '../../components/Header';
import { ITEMS_PER_PAGE } from '../../constants';
import useDebounced from '../../hooks/useDebounced';

const News = ({ loading, newsCache, getNews, news, totalCount }) => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page, 10) || 1;
  const currentSearch = router.query.search || '';

  const searchDebounced = useDebounced(currentSearch, 1000);
  const isSearchQuery = searchDebounced.length > 0;

  const onSearchChange = (query) => {
    let searchQuery = `&search=${query}`;
    if (!query) {
      searchQuery = '';
    }
    router.push(`/news?page=${currentPage}${searchQuery}`);
  };

  const handlePageChange = (newPage) => {
    router.push(`/news?page=${newPage}`);
  };

  useEffect(() => {
    getNews(currentPage, ITEMS_PER_PAGE, searchDebounced);
  }, [currentPage, searchDebounced]);

  const newsList = useMemo(() => {
    let list = [];
    if (!newsCache || isSearchQuery) {
      list = news;
    } else {
      list = newsCache?.[currentPage];
    }
    return list?.map((post, idx) => {
      return <NewsCard key={post.id} idx={idx} post={post} className="news__card" />;
    });
  }, [newsCache, news, currentPage, isSearchQuery]);

  const hasNews = newsList?.length > 0;
  const isLastPage = newsList?.length < ITEMS_PER_PAGE;

  return (
    <Page title="Новини" className="news">
      <Header title="Шкільні новини" className="_mobile-pb">
        <label className="news__input-wrapper">
          <input
            value={currentSearch}
            onChange={(e) => onSearchChange(e.target.value)}
            className="news__input"
            placeholder="Пошук новин..."
            type="text"
          />
          <IconSearch className="news__input-icon" />
        </label>
      </Header>
      <SLoader loading={loading}>
        {hasNews || loading ? (
          <div className="news__grid-wrapper">
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
              hasItems={hasNews}
              isLastPage={isLastPage}
              isSearchQuery={isSearchQuery}
              loading={loading}
            />
            <div className="news__grid">{newsList}</div>
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
              hasItems={hasNews}
              isLastPage={isLastPage}
              isSearchQuery={isSearchQuery}
              loading={loading}
            />
          </div>
        ) : (
          <Empty />
        )}
      </SLoader>
    </Page>
  );
};

News.defaultProps = {
  newsCache: null,
  getNews: () => [],
  loading: false,
  news: [],
  totalCount: 0
};

News.propTypes = {
  newsCache: PropTypes.shape({}),
  getNews: PropTypes.func,
  loading: PropTypes.bool,
  news: PropTypes.arrayOf(PropTypes.shape({})),
  totalCount: PropTypes.number
};

export default connect(
  ({ news: { loading, cache, posts, totalCount } }) => ({
    loading,
    newsCache: cache,
    news: posts,
    totalCount
  }),
  {
    getNews: actions.getNews
  }
)(News);
