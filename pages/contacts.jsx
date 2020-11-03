import React, { useEffect, useState } from 'react';
import { Page } from '../components';
import Typed from 'typed.js';

const Contacts = () => {



  const options = {
    stringsElement: '#typed-strings',
    typeSpeed: 40,
    smartBackspace: true
  };

  const [typed, setTyped] = useState(null)

  useEffect(() => {
    if (process.browser) {
      setTyped(new Typed('#typed', options))
    };
    return () => setTyped(null);
  }, [])

  return (
    <Page title="Контактна інформація">
      <div className="contacts">
        <h1 className='contacts__title'>Контактна інформація</h1>
        <div className="contacts__container">
          <div className="contacts__content">
            <div id="typed-strings">
              <p>^1000 Привіт ^1000</p>
              <p>Ми Кременчуцька школа №23 ^1000</p>
              <p>Давайте робити чудові справи разом ^1000</p>
            </div>
            <span id="typed"></span>
          </div>
          <div className="contacts__info">
            <p className="contacts__caption">
              Контакти
            </p>
            <a target='_blank' href='mailto:kremenchuk.school23@gmail.com' className='contacts__value'>school23@gmail.com</a>
            <p className='contacts__value'>
              <a target='_blank' href="tel:73-94-35" className="contacts__link">73-94-35</a>
              <a target='_blank' href="tel:73-94-38" className="contacts__link">73-94-38</a>
            </p>
            <a title='Google map' href='https://goo.gl/maps/ABogqNDvyKcTHP3E7' target='_blank' className='contacts__value'>39600, Україна, Полтавська область, м. Кременчук, вул. Олександрійська, 18</a>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Contacts;
