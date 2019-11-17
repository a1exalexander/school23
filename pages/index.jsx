import React from 'react';
import dynamic from 'next/dynamic';
import { Page } from '../components';
import SVideo from '../components/common/media/SVideo';
import HomeBanner from '../components/views/home/HomeBanner';

const Home = () => {

  return (
    <Page>
      <div className="home">
        <div className="home__line">
          <HomeBanner className="home__banner" />
        </div>
        <div className="home__layer"></div>
        <SVideo
          className="home__video"
          videos={[{ src: '/23.mp4', type: 'video/mp4' }]}
        />
        <p className="home__city animated delay-4s slow fadeIn">м. Кременчук</p>
      </div>
    </Page>
  );
};

export default Home;
