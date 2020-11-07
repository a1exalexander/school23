import React from 'react';
import dynamic from 'next/dynamic';
import Page from '../components/Page';
import HomeBanner from '../components/views/home/HomeBanner';
import checkAuth from '../middlewares/checkAuth';

const SVideo = dynamic(() => import('../components/common/media/SVideo'), { ssr: false });
const SNavigationInfo = dynamic(
  () => import('../components/navigation/components/SNavigationInfo'),
  { ssr: false }
);

const Home = () => {
  const VideoLayer = () => {
    if (process.browser) {
      return (
        window.innerWidth > 800 && (
          <SVideo
            className="home__video is-desktop"
            videos={[{ src: '/23.mp4', type: 'video/mp4' }]}
          />
        )
      );
    }
    return null;
  };

  return (
    <Page>
      <div className="home">
        <div className="home__line">
          <HomeBanner className="home__banner" />
          <div className="home__inner animated delay-1s slow fadeIn">
            <p className="home__city">м. Кременчук</p>
            <SNavigationInfo className="home__info" />
          </div>
        </div>
        <div className="home__layer"></div>
        {VideoLayer()}
      </div>
    </Page>
  );
};

Home.getInitialProps = async (ctx) => {
  await checkAuth(ctx);
  return {};
};

export default Home;
