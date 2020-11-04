import React from 'react';
import { Page } from '../components';

const About = () => {
  return (
    <Page title="Про школу">
      <div className="about">
        <header className="about__header">
          <div className="container">
            <h1 className="about__title animated slow delay-1s fadeIn">Крeменчуцька гімназія №23</h1>
            <p className="about__text animated delay-2s slow fadeIn about__text--light about__text--center">
              Наша школа – навчальний заклад з давньою історією, в якому приємно не лише вчитись, а
              й здобувати гарні, міцні , дорогоцінні знання. Навчальний заклад відкриє чарівний світ
              наук, зробить все для того, щоб учнівські роки промайнули з великою радістю та
              приємними згадками про подорожі,спортивні змагання, веселі години позакласного життя.
            </p>
            <p className="about__text animated delay-2s slow fadeIn about__text--light about__text--center is-desktop">
              Педагогічний склад - професіонали своєї справи, які уміло володіють педагогічною
              майстерністю. Кредо наших педагогів: найкращий спосіб зробити дітей хорошими - це
              зробити їх щасливими. Маю надію, що відвідувачі сайту дізнаються про історію і
              сьогодення школи, про перемоги, досягнення і гарні традиції, організацію навчального
              процесу, та людей які тут навчаються та працюють, знайдуть на його сторінках багато
              корисної і цікавої інформації. Заздалегідь вдячні за Ваші відгуки і побажання. Ми
              будемо раді спілкуванню з Вами!
            </p>
          </div>
        </header>
        <article className="about__section">
          <div className="container">
            <div className="about__frame">
              <div className="about__text about__text--center">
                <p className="is-mobile">
                  Педагогічний склад - професіонали своєї справи, які уміло володіють педагогічною
                  майстерністю. Кредо наших педагогів: найкращий спосіб зробити дітей хорошими - це
                  зробити їх щасливими. Маю надію, що відвідувачі сайту дізнаються про історію і
                  сьогодення школи, про перемоги, досягнення і гарні традиції, організацію
                  навчального процесу, та людей які тут навчаються та працюють, знайдуть на його
                  сторінках багато корисної і цікавої інформації.
                  <br />
                  <br />
                </p>
                Головною метою освіти сучасної людини є здобуття знань на високому рівні. Школа №23
                надає обдарованим дітям можливість реалізувати свої індивідуальні творчі здібності,
                оволодіти навичками наукової роботи, знаннями етики, художньої культури, опанування
                іноземними мовами, комп’ютерною технікою та продовжити відповідну освіту у вищій
                школі. Основним завданням школи є виховання морально і фізично здорової дитини,
                розвиток її природних здібностей, формування творчої особистості, самосвідомості на
                основі практичних занять, пізнання себе, суспільства.
              </div>
            </div>
          </div>
        </article>
        <article className="about__section">
          <div className="container">
            <div className="about__frame">
              <p className="about__text about__text--center">
                Школа I - III ступенів передбачає пізнання учнями оточуючого середовища, себе, свого
                здоров’я, формування необхідного самоаналізу, творчості, мотивації досягнення цілей,
                виховання активності, ініціативності, наполегливості, надання якісної середньої
                освіти, зорієнтованої на здібних дітей, виховання творчо обдарованої людини, яка
                проявить себе в тій чи іншій сфері діяльності.
              </p>
            </div>
          </div>
        </article>
      </div>
    </Page>
  );
};

export default About;
