/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useMemo, useState } from 'react';
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

const News = ({ loading, newsCache, getNews }) => {
  const router = useRouter();
  const [state, setState] = useState('');
  const currentPage = parseInt(router.query.page, 10) || 1;

  useEffect(() => {
    getNews(currentPage, ITEMS_PER_PAGE);
  }, [currentPage]);

  const newsList = useMemo(() => {
    return newsCache?.[currentPage]?.map((post, idx) => {
      return <NewsCard key={post.id} idx={idx} post={post} className="news__card" />;
    });
  }, [newsCache, currentPage]);

  const hasNews = newsCache?.[currentPage]?.length > 0;

  const handleChange = (e) => {
    const { value } = e.target;
    setState(value);
  };

  const handlePageChange = (newPage) => {
    router.push(`/news?page=${newPage}`);
  };

  const renderPagination = () => {
    return (
      <div className="news__pagination">
        <SButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          type="secondary"
          buttonType="button"
          label="Назад"
        >
          ⬅️
        </SButton>
        <span>
          <span>Сторінка </span>
          <strong>{currentPage}</strong>
        </span>
        <SButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNews}
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
            value={state}
            onChange={handleChange}
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
            {!loading && renderPagination()}
            <div className="news__grid">{newsList}</div>
            {!loading && renderPagination()}
          </div>
        ) : (
          <Empty />
        )}
      </SLoader>
    </Page>
  );
};

News.defaultProps = {
  newsCache: {},
  getNews: () => [],
  loading: false
};

News.propTypes = {
  newsCache: PropTypes.shape({}),
  getNews: PropTypes.func,
  loading: PropTypes.bool
};

export default connect(
  ({ news: { loading, cache } }) => ({
    loading,
    newsCache: cache
  }),
  {
    getNews: actions.getNews
  }
)(News);
