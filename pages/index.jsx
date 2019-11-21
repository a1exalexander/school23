import React from 'react';
import dynamic from 'next/dynamic';
import { Page } from '../components';
import HomeBanner from '../components/views/home/HomeBanner';

const SVideo = dynamic(() => import('../components/common/media/SVideo'), { ssr: false });

const Home = () => {
  const VideoLayer = () => {
    if (process.browser) {
      return window.innerWidth > 800 && (
        <SVideo className="home__video is-desktop" videos={[{ src: '/23.mp4', type: 'video/mp4' }]} />
      )
    }
    return null;
  }

  return (
    <Page>
      <div className="home">
        <div className="home__line">
          <HomeBanner className="home__banner" />
        </div>
        <div className="home__layer"></div>
        {VideoLayer()}
        <p className="home__city animated delay-4s slow fadeIn">м. Кременчук</p>
      </div>
    </Page>
  );
};

export default Home;
