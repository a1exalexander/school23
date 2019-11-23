import React from 'react';
import NewsCard from '../../components/views/news/NewsCard';
import { Page } from '../../components';
import { IconSearch } from '../../components/common/icons';

const Home = () => {
  const newsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item, idx) => {
    return <NewsCard key={idx} idx={idx} className='news__card'/>
  });

  return (
    <Page title='School 23 News'>
      <div className="news">
        <header className='news__header'>
          <h1 className="news__title">Шкільні новини</h1>
          <label className='news__input-wrapper'>
            <input className="news__input" placeholder='Пошук новин...' type="text"/>
            <IconSearch className='news__input-icon'/>
          </label>
        </header>
        <div className="news__grid">
          {newsList}
        </div>
      </div>
    </Page>
  );
};

export default Home;
