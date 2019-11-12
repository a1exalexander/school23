import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Page } from '../components';
import Head from 'next/head';
import IconSchoolColor from '../assets/svg/school.svg';
import SchoolImage from '../assets/images/23_bg.jpg';

const AboutMainSlider = dynamic(() => import('../components/views/about/_AboutMainSlider'), {
  ssr: false
});

const AboutSliderBoss = dynamic(() => import('../components/views/about/_AboutSliderBoss'), {
  ssr: false
});

const About = () => {
  return (
    <Page title="Про школу">
      <Head>
        <link rel="stylesheet" href="css/uikit.css" />
        <script src="scripts/uikit.min.js"></script>
        <script src="scripts/uikit-icons.min.js"></script>
      </Head>
      <div className="about">
        <header className="about__header">
          <div
            id="test-filter"
            className="about__header-image uk-background-cover uk-light uk-flex"
            uk-parallax="bgy: -100"
            style={{ backgroundImage: `url('images/23_bg.jpg')` }}
          >
            <div className="about__header-inner" uk-parallax="blur: 0,10; opacity: 0;">
              <h1 className="about__title">Крeменчуцька школа №23</h1>
              <p className='about__text about__text--light about__text--center'>
                Наша школа – навчальний заклад з давньою історією, в
                якому приємно не лише вчитись, а й здобувати гарні, міцні , дорогоцінні знання.
                Навчальний заклад відкриє чарівний світ наук, зробить все для того, щоб учнівські
                роки промайнули з великою радістю та приємними згадками про подорожі,спортивні
                змагання, веселі години позакласного життя.
              </p>
              <p className="about__text about__text--light about__text--center is-desktop">
                Педагогічний склад - професіонали своєї
                справи, які уміло володіють педагогічною майстерністю. Кредо наших педагогів:
                найкращий спосіб зробити дітей хорошими - це зробити їх щасливими. Маю надію, що
                відвідувачі сайту дізнаються про історію і сьогодення школи, про перемоги,
                досягнення і гарні традиції, організацію навчального процесу, та людей які тут
                навчаються та працюють, знайдуть на його сторінках багато корисної і цікавої
                інформації. Заздалегідь вдячні за Ваші відгуки і побажання. Ми будемо раді
                спілкуванню з Вами!
              </p>
            </div>
          </div>
        </header>
        <section className="about__section">
          <div className="about__frame">
            <p className="about__text about__text--center">
              <p className="is-mobile">
                Педагогічний склад - професіонали своєї справи, які уміло володіють педагогічною
                майстерністю. Кредо наших педагогів: найкращий спосіб зробити дітей хорошими - це
                зробити їх щасливими. Маю надію, що відвідувачі сайту дізнаються про історію і
                сьогодення школи, про перемоги, досягнення і гарні традиції, організацію навчального
                процесу, та людей які тут навчаються та працюють, знайдуть на його сторінках багато
                корисної і цікавої інформації.
                <br /><br />
              </p>
              Головною метою освіти сучасної людини є здобуття знань на високому рівні. Школа №23
              надає обдарованим дітям можливість реалізувати свої індивідуальні творчі здібності,
              оволодіти навичками наукової роботи, знаннями етики, художньої культури, опанування
              іноземними мовами, комп’ютерною технікою та продовжити відповідну освіту у вищій
              школі. Основним завданням школи є виховання морально і фізично здорової дитини,
              розвиток її природних здібностей, формування творчої особистості, самосвідомості на
              основі практичних занять, пізнання себе, суспільства.
            </p>
          </div>
        </section>
        <AboutMainSlider className="about__slider" />
        <section className="about__section">
          <div className="about__frame">
            <p className="about__text about__text--center">
              Школа I - III ступенів передбачає пізнання учнями оточуючого середовища, себе, свого
              здоров’я, формування необхідного самоаналізу, творчості, мотивації досягнення цілей,
              виховання активності, ініціативності, наполегливості, надання якісної середньої
              освіти, зорієнтованої на здібних дітей, виховання творчо обдарованої людини, яка
              проявить себе в тій чи іншій сфері діяльності.
            </p>
          </div>
        </section>
        <AboutSliderBoss />
      </div>
    </Page>
  );
};

export default About;
