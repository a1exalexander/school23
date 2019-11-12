import React from 'react';
import { Page } from '../components';
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
        className='home__video is-desktop'
        videos={[
          { src: '/23.mp4', type: 'video/mp4' }
        ]}
      />
      <img src="images/23_bg.jpg" alt="" className='home__bg'/>
    </div>

  </Page>
)

export default Home
