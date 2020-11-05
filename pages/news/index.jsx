import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewsCard from '../../components/views/news/NewsCard';
import { actions, getters } from '../../store/modules/news';
import { Page, SLoader, Empty } from '../../components';
import { IconSearch } from '../../components/common/icons';

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
  }, []);

  return (
    <Page title="Новини">
      <div className="news">
        <header className="news__header">
          <h1 className="news__title">Шкільні новини</h1>
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
        </header>
        <SLoader loading={loading}>
          {hasNews || loading ? <div className="news__grid">{newsList}</div> : <Empty />}
        </SLoader>
      </div>
    </Page>
  );
};

News.propTypes = {
  news: PropTypes.func,
  getNews: PropTypes.func,
  hasNews: PropTypes.bool,
  loading: PropTypes.bool,
};

export default connect(
  ({ news: { posts, loading } }) => ({
    loading,
    hasNews: getters.hasNews(posts),
    news: getters.filteredNews(posts),
  }),
  {
    getNews: actions.getNews,
  }
)(News);
