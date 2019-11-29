import Head from "next/head";
const Meta = ({ title = 'School 23' }) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
    <meta name="msapplication-TileColor" content="#da532c"></meta>
    <meta name="theme-color" content="#ffffff"></meta>
    <meta name="author" content="Alex Ratushnyi"></meta>
    <meta name="description" content="Привіт! Це сайт Кременчуцької школи №23, Полтавської області. Відвідай наш сайт та дізнайся більше про нас"></meta>
    <meta  name="keywords" content="school 23, school 23 kremenchuk, 23 школа, кременчук, 23 школа кременчук, ЗОШ 23, ЗОШ 23 кременчук" />
    <title>{ title }</title>
  </Head>
);
export default Meta;
