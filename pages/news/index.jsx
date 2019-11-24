import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewsCard from '../../components/views/news/NewsCard';
import { actions, getters } from '../../store/modules/news';
import { Page, SLoader } from '../../components';
import { IconSearch } from '../../components/common/icons';

const News = ({ loading, news, hasNews, getNews }) => {
  const newsList = news.map((post, idx) => {
    return <NewsCard key={post.id} idx={idx} post={post} className="news__card" />;
  });

  useEffect(() => {
    getNews();
  }, []);

  return (
    <Page title="School 23 News">
      <div className="news">
        <header className="news__header">
          <h1 className="news__title">Шкільні новини</h1>
          <label className="news__input-wrapper">
            <input className="news__input" placeholder="Пошук новин..." type="text" />
            <IconSearch className="news__input-icon" />
          </label>
        </header>
        <SLoader fluid loading={!hasNews && loading}>
          <div className="news__grid">{newsList}</div>
        </SLoader>
      </div>
    </Page>
  );
};

News.propTypes = {
  news: PropTypes.array,
  getNews: PropTypes.func,
  hasNews: PropTypes.bool,
  loading: PropTypes.bool,
};

export default connect(({ news: { posts, loading } }) => ({ loading, hasNews: getters.hasNews(posts), news: posts }), {
  getNews: actions.getNews
})(News);
