import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import NewsCard from '../../components/views/news/NewsCard';
import { actions } from '../../store/modules/news';
import { Empty, SLoader, Pagination } from '../../components';
import { SSearch } from '../../components/common/form/SSearch';
import { Page } from '../../components/Page';
import { Header } from '../../components/Header';
import { ITEMS_PER_PAGE } from '../../constants';
import useDebounced from '../../hooks/useDebounced';
import { YearDivider } from '../../components/common/YearDivider';
import { withYearDividers, yearFromUnix } from '../../utils/groupByYear';

const News = ({ loading, newsCache, getNews, news, totalCount }) => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page, 10) || 1;
  const currentSearch = router.query.search || '';

  const searchDebounced = useDebounced(currentSearch, 1000);
  const isSearchQuery = searchDebounced.length > 0;

  const onSearchChange = (query) => {
    const searchQuery = query ? `&search=${encodeURIComponent(query)}` : '';
    router.push(`/news?page=${currentPage}${searchQuery}`);
  };

  const handlePageChange = (newPage) => {
    router.push(`/news?page=${newPage}`);
  };

  useEffect(() => {
    getNews(currentPage, ITEMS_PER_PAGE, searchDebounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchDebounced]);

  const newsList = useMemo(() => {
    let list = [];
    if (!newsCache || isSearchQuery) {
      list = news;
    } else {
      list = newsCache?.[currentPage];
    }
    return withYearDividers(list, (post) => yearFromUnix(post?.created)).map((entry, idx) => {
      if (entry.kind === 'divider') {
        return <YearDivider key={entry.key} year={entry.year} className="news__divider" />;
      }
      const { item: post } = entry;
      const featured = idx === 0 && !isSearchQuery && currentPage === 1;
      return (
        <NewsCard
          key={post.id}
          post={post}
          featured={featured}
          className={`news__card${featured ? ' _featured' : ''}`}
        />
      );
    });
  }, [newsCache, news, currentPage, isSearchQuery]);

  const hasNews = newsList?.length > 0;
  const isLastPage = newsList?.length < ITEMS_PER_PAGE;

  return (
    <Page title="Новини" className="news">
      <div className="Page__inner">
        <Header
          title="Шкільні новини"
          description="Статті, фотозвіти та оголошення з життя гімназії."
        >
          <SSearch value={currentSearch} onChange={onSearchChange} placeholder="Пошук новин..." />
        </Header>
        <SLoader loading={loading}>
          {hasNews || loading ? (
            <div className="news__grid-wrapper">
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
            <Empty
              text={isSearchQuery ? 'Нічого не знайдено' : 'Новин поки немає'}
              hint={isSearchQuery ? 'Спробуйте змінити пошуковий запит.' : undefined}
            />
          )}
        </SLoader>
      </div>
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
