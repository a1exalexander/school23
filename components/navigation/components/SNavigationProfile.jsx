import React from 'react'

const SNavigationProfile = () => {
  return (
    <div className='nav-profile-card'>
      <div className='nav-profile-card__image-wrapper'>
        <img className='nav-profile-card__image' src="https://i.pravatar.cc/300" alt=""/>
      </div>
      <div className='nav-profile-card__name-box'>
        <p className='nav-profile-card__name'>{'Петро Порошенко'}</p>
        <p className='nav-profile-card__job'>{'учень'}</p>
      </div>
      <div className='nav-profile-card__class-room'>
        {'9-A'}
      </div>
    </div>
  );
}

export default SNavigationProfile;