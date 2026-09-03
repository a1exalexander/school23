import React from 'react';
import { Header } from '../components/Header';
import { Page } from '../components/Page';
import { IconMail } from '../components/common/icons';

const EMAIL = 'kremenchuk.school23@gmail.com';
const PHONES = [
  { display: '(0536) 73-94-35', href: 'tel:+380536739435' },
  { display: '(0536) 73-94-38', href: 'tel:+380536739438' }
];
const ADDRESS = 'вул. Олександрійська, 18, м. Кременчук, Полтавська область, 39621';
const MAP_LINK = 'https://goo.gl/maps/ABogqNDvyKcTHP3E7';
const MAP_EMBED =
  'https://maps.google.com/maps?q=%D0%9A%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D1%87%D1%83%D0%BA%2C%20%D0%B2%D1%83%D0%BB.%20%D0%9E%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D1%96%D0%B9%D1%81%D1%8C%D0%BA%D0%B0%2C%2018&t=&z=16&ie=UTF8&iwloc=&output=embed';

const IconPhone = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8z" />
  </svg>
);

const IconPin = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
  </svg>
);

const Contacts = () => {
  return (
    <Page title="Контактна інформація" className="contacts">
      <div className="Page__inner">
        <Header
          title="Контакти"
          description="Ми — Кременчуцька гімназія №23. Пишіть, телефонуйте або приходьте: давайте робити добрі справи разом!"
        />
        <div className="contacts__layout">
          <ul className="contacts__list">
            <li className="contacts__item">
              <a href={`mailto:${EMAIL}`} className="contacts__card">
                <span className="contacts__icon _mail">
                  <IconMail />
                </span>
                <span className="contacts__body">
                  <span className="contacts__caption">Електронна пошта</span>
                  <span className="contacts__value">{EMAIL}</span>
                  <span className="contacts__hint">Написати листа</span>
                </span>
              </a>
            </li>
            <li className="contacts__item">
              <div className="contacts__card _static">
                <span className="contacts__icon _phone">
                  <IconPhone />
                </span>
                <span className="contacts__body">
                  <span className="contacts__caption">Телефони</span>
                  {PHONES.map((phone) => (
                    <a key={phone.href} href={phone.href} className="contacts__value _link">
                      {phone.display}
                    </a>
                  ))}
                </span>
              </div>
            </li>
            <li className="contacts__item">
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noreferrer"
                className="contacts__card"
                title="Відкрити в Google Maps"
              >
                <span className="contacts__icon _pin">
                  <IconPin />
                </span>
                <span className="contacts__body">
                  <span className="contacts__caption">Адреса</span>
                  <span className="contacts__value">{ADDRESS}</span>
                  <span className="contacts__hint">Відкрити в Google Maps</span>
                </span>
              </a>
            </li>
          </ul>
          <div className="contacts__map">
            <iframe
              title="Кременчуцька гімназія №23 на карті"
              src={MAP_EMBED}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Contacts;
