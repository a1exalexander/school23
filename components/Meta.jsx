import Head from "next/head";
const Meta = ({ title = 'School 23' }) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel='icon' href='/favicon.ico' />
    <title>{ title }</title>
  </Head>
);
export default Meta;
