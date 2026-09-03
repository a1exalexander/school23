import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IconArrowLeft } from './icons';

const generatePageNumbers = (currentPage, totalCount, itemsPerPage, isLastPage) => {
  let lastPage;
  if (totalCount > 0) {
    lastPage = Math.ceil(totalCount / itemsPerPage);
  } else if (isLastPage) {
    lastPage = currentPage;
  } else {
    lastPage = currentPage + 1;
  }
  lastPage = Math.max(lastPage, currentPage);

  if (lastPage <= 7) {
    return Array.from({ length: lastPage }, (_, i) => i + 1);
  }

  const delta = 2;
  const rangeStart = Math.max(2, currentPage - delta);
  const rangeEnd = Math.min(lastPage - 1, currentPage + delta);
  const pages = [1];

  if (rangeStart > 2) pages.push('...');
  for (let i = rangeStart; i <= rangeEnd; i += 1) pages.push(i);
  if (rangeEnd < lastPage - 1) pages.push('...');
  if (rangeEnd < lastPage) pages.push(lastPage);

  return pages;
};

const Pagination = ({
  currentPage,
  totalCount,
  itemsPerPage,
  onPageChange,
  hasItems,
  isLastPage,
  isSearchQuery,
  loading,
  className
}) => {
  if (isSearchQuery || loading) {
    return null;
  }

  const pageNumbers = generatePageNumbers(currentPage, totalCount, itemsPerPage, isLastPage);

  const renderPageButton = (page, index) => {
    if (page === '...') {
      return (
        <span key={`ellipsis-${index}`} className="pagination__ellipsis" aria-hidden="true">
          …
        </span>
      );
    }
    const isCurrentPage = page === currentPage;
    const isDisabled = isCurrentPage || (page > currentPage && isLastPage);
    return (
      <button
        key={`page-${page}`}
        type="button"
        className={classNames('pagination__page', { 'pagination__page--active': isCurrentPage })}
        onClick={() => onPageChange(page)}
        disabled={isDisabled}
        aria-current={isCurrentPage ? 'page' : undefined}
        aria-label={`Сторінка ${page}`}
      >
        {page}
      </button>
    );
  };

  return (
    <nav className={classNames('pagination', className)} aria-label="Пагінація">
      <button
        type="button"
        className="pagination__button _prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Попередня сторінка"
      >
        <IconArrowLeft />
        <span className="pagination__button-text">Назад</span>
      </button>
      <div className="pagination__pages">{pageNumbers.map(renderPageButton)}</div>
      <button
        type="button"
        className="pagination__button _next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasItems || isLastPage}
        aria-label="Наступна сторінка"
      >
        <span className="pagination__button-text">Вперед</span>
        <IconArrowLeft />
      </button>
    </nav>
  );
};

Pagination.defaultProps = {
  isSearchQuery: false,
  loading: false,
  className: ''
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  hasItems: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  isSearchQuery: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string
};

export default Pagination;
