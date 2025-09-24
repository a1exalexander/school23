import React from 'react';
import PropTypes from 'prop-types';
import { SButton } from '../index';

const Pagination = ({
  currentPage,
  totalCount,
  itemsPerPage,
  onPageChange,
  hasItems,
  isLastPage,
  isSearchQuery = false,
  loading = false,
  className = ''
}) => {
  const generatePageNumbers = () => {
    // Calculate exact last page from total count
    const exactLastPage = totalCount > 0 ? Math.ceil(totalCount / itemsPerPage) : currentPage;

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
        <span key={`ellipsis-${index}`} className="pagination__ellipsis">
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
        className={`pagination__page ${isCurrentPage ? 'pagination__page--active' : ''}`}
        onClick={() => onPageChange(pageNum)}
        disabled={isDisabled}
        type={isCurrentPage ? 'primary' : 'secondary'}
        buttonType="button"
      >
        {pageNum}
      </SButton>
    );
  };

  // Don't render if search query or loading
  if (isSearchQuery || loading) {
    return null;
  }

  const pageNumbers = generatePageNumbers();

  return (
    <div className={`pagination ${className}`}>
      <SButton
        className="pagination__button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        type="secondary"
        buttonType="button"
        label="Назад"
      >
        ⬅️
      </SButton>
      <div className="pagination__pages">
        {pageNumbers.map((page, index) => renderPageButton(page, index))}
      </div>
      <SButton
        className="pagination__button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasItems || isLastPage}
        type="secondary"
        buttonType="button"
        label="Вперед"
      >
        ➡️
      </SButton>
    </div>
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
