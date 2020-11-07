import React, { useEffect, useState } from 'react';
import Typed from 'typed.js';
import Page from '../components/Page';

const options = {
  strings: [
    '^500 <span class="contacts__message">Привіт!</span> \n ^500 <span class="contacts__message">Ми Кременчуцька гімназія №23</span> \n ^500 <span>Давайте робити чудові справи разом ☀️</span> ^500'
  ],
  typeSpeed: 40,
  smartBackspace: false
};

const Contacts = () => {
  const [, setTyped] = useState(null);

  useEffect(() => {
    if (process.browser) {
      setTyped(null);
      setTyped(new Typed('#typed', options));
    }
    return () => setTyped(null);
  }, []);

  return (
    <Page title="Контактна інформація">
      <div className="contacts">
        <h1 className="contacts__title">Контактна інформація</h1>
        <div className="contacts__container">
          <div className="contacts__content">
            <span id="typed" />
          </div>
          <div className="contacts__info">
            <p className="contacts__caption">Контакти</p>
            <a
              target="_blank"
              rel="noreferrer"
              href="mailto:kremenchuk.school23@gmail.com"
              className="contacts__value"
            >
              school23@gmail.com
            </a>
            <p className="contacts__value">
              <a target="_blank" rel="noreferrer" href="tel:73-94-35" className="contacts__link">
                73-94-35
              </a>
              <a target="_blank" rel="noreferrer" href="tel:73-94-38" className="contacts__link">
                73-94-38
              </a>
            </p>
            <a
              title="Google map"
              href="https://goo.gl/maps/ABogqNDvyKcTHP3E7"
              target="_blank"
              rel="noreferrer"
              className="contacts__value"
            >
              39600, Україна, Полтавська область, м. Кременчук, вул. Олександрійська, 18
            </a>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Contacts;
