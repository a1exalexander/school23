/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import NewsCard from '../../components/views/news/NewsCard';
import { actions } from '../../store/modules/news';
import { Empty, SButton, SLoader } from '../../components';
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

  const generatePageNumbers = () => {
    // Calculate exact last page from total count
    const exactLastPage = totalCount > 0 ? Math.ceil(totalCount / ITEMS_PER_PAGE) : currentPage;

    // Use exact count if available, otherwise fall back to estimation
    let lastPage;
    if (totalCount > 0) {
      lastPage = exactLastPage;
    } else if (isLastPage) {
      lastPage = currentPage;
    } else {
      lastPage = currentPage + 1;
    }

    // Ensure lastPage is at least currentPage
    lastPage = Math.max(lastPage, currentPage);

    const pages = [];

    // If we have 7 or fewer pages total, show them all
    if (lastPage <= 7) {
      for (let i = 1; i <= lastPage; i += 1) {
        pages.push(i);
      }
      return pages;
    }

    // Complex pagination logic for more than 7 pages
    const delta = 2; // Number of pages around current page

    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(lastPage - 1, currentPage + delta);

    // Always show page 1
    pages.push(1);

    // Add left ellipsis if there's a gap after page 1
    if (rangeStart > 2) {
      pages.push('...');
    }

    // Add pages in the range around current page
    for (let i = rangeStart; i <= rangeEnd; i += 1) {
      // Don't add page 1 again
      if (i !== 1) {
        pages.push(i);
      }
    }

    // Add right ellipsis if there's a gap before last page
    if (rangeEnd < lastPage - 1) {
      pages.push('...');
    }

    // Always show last page (if it's different from page 1)
    if (lastPage > 1 && rangeEnd < lastPage) {
      pages.push(lastPage);
    }

    return pages;
  };

  const renderPageButton = (page, index) => {
    if (page === '...') {
      return (
        <span key={`ellipsis-${index}`} className="news__pagination-ellipsis">
          ...
        </span>
      );
    }

    const pageNum = typeof page === 'number' ? page : parseInt(page, 10);
    const isCurrentPage = pageNum === currentPage;
    const isDisabled = isCurrentPage || (pageNum > currentPage && isLastPage);

    return (
      <SButton
        key={`page-${pageNum}-${index}`}
        className={`news__pagination-page ${isCurrentPage ? 'news__pagination-page--active' : ''}`}
        onClick={() => handlePageChange(pageNum)}
        disabled={isDisabled}
        type={isCurrentPage ? 'primary' : 'secondary'}
        buttonType="button"
      >
        {pageNum}
      </SButton>
    );
  };

  const renderPagination = () => {
    if (isSearchQuery || loading) {
      return null;
    }

    const pageNumbers = generatePageNumbers();

    return (
      <div className="news__pagination">
        <SButton
          className="news__pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          type="secondary"
          buttonType="button"
          label="Назад"
        >
          ⬅️
        </SButton>
        <div className="news__pagination-pages">
          {pageNumbers.map((page, index) => renderPageButton(page, index))}
        </div>
        <SButton
          className="news__pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNews || isLastPage}
          type="secondary"
          buttonType="button"
          label="➡️"
        >
          Вперед
        </SButton>
      </div>
    );
  };

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
            {renderPagination()}
            <div className="news__grid">{newsList}</div>
            {renderPagination()}
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
