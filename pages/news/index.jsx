/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewsCard from '../../components/views/news/NewsCard';
import { actions, getters } from '../../store/modules/news';
import { SLoader, Empty } from '../../components';
import { Page } from '../../components/Page';
import { IconSearch } from '../../components/common/icons';
import { Header } from '../../components/Header';

const News = ({ loading, news, hasNews, getNews }) => {
  const [state, setState] = useState('');

  const newsList = news(state).map((post, idx) => {
    return <NewsCard key={post.id} idx={idx} post={post} className="news__card" />;
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setState(value);
  };

  useEffect(() => {
    getNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <div className="news__grid">{newsList}</div>
          </div>
        ) : (
          <Empty />
        )}
      </SLoader>
    </Page>
  );
};

News.defaultProps = {
  news: () => [],
  getNews: () => [],
  hasNews: false,
  loading: false
};

News.propTypes = {
  news: PropTypes.func,
  getNews: PropTypes.func,
  hasNews: PropTypes.bool,
  loading: PropTypes.bool
};

export default connect(
  ({ news: { posts, loading } }) => ({
    loading,
    hasNews: getters.hasNews(posts),
    news: getters.filteredNews(posts)
  }),
  {
    getNews: actions.getNews
  }
)(News);
