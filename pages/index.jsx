import React from 'react';
import { Page } from '../components';
import '../scss/styles.scss';
import SVideo from '../components/common/media/SVideo';
import HomeBanner from '../components/views/home/HomeBanner';

const Home = () => (
  <Page>
    <div className='home'>

      <div className='home__line'>
        <HomeBanner className='home__banner'/>
      </div>
      <div className='home__layer'></div>
      <SVideo
        className='home__video'
        videos={[
          { src: '/23.mp4', type: 'video/mp4' }
        ]}
      />
    </div>

  </Page>
)

export default Home
