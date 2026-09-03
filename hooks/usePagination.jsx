import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { ITEMS_PER_PAGE } from '../constants';

/**
 * Client-side pagination for pages which load the whole list at once.
 * The current page is kept in the `page` query param, so it survives
 * navigation back to the list and can be shared by link.
 */
const usePagination = (items, itemsPerPage = ITEMS_PER_PAGE) => {
  const router = useRouter();

  const list = useMemo(() => items || [], [items]);
  const totalCount = list.length;
  const totalPages = totalCount > 0 ? Math.ceil(totalCount / itemsPerPage) : 1;

  const requestedPage = parseInt(router.query.page, 10) || 1;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return list.slice(start, start + itemsPerPage);
  }, [list, currentPage, itemsPerPage]);

  const goToPage = (newPage) => {
    const page = Math.min(Math.max(newPage, 1), totalPages);
    const query = { ...router.query };

    if (page > 1) {
      query.page = String(page);
    } else {
      delete query.page;
    }

    router.push({ pathname: router.pathname, query });
  };

  const resetPage = () => {
    if (requestedPage > 1) {
      goToPage(1);
    }
  };

  return {
    currentPage,
    totalCount,
    totalPages,
    pageItems,
    hasItems: pageItems.length > 0,
    isLastPage: currentPage >= totalPages,
    goToPage,
    resetPage
  };
};

export default usePagination;
