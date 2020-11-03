import React from 'react';
import Head from 'next/head';
import { number, string } from 'prop-types';
import { siteUrl } from '../next-sitemap';

const defaultTitle = 'Кременчуцька школа №23';

const Meta = ({ title, description, image, ogType, imageWidth, imageHeight }) => {
  const formatedTitle = `${title}${title !== defaultTitle ? ` | ${defaultTitle}` : ''}`;
  return (
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
      <meta name="description" content={description}></meta>
      <meta
        name="keywords"
        content="23 школа кременчуг, school 23, school 23 kremenchuk, 23 школа, кременчук, 23 школа кременчук, ЗОШ 23, ЗОШ 23 кременчук"
      />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content="uk_UA" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={formatedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image:width" content={imageWidth} />
      <meta property="og:image:height" content={imageHeight} />
      <meta property="og:image" content={`${siteUrl}/images/${image}`} />
      <title>{formatedTitle}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: defaultTitle,
  description:
    'Кременчуцька школа №23. | 39600, Україна, Полтавська область, м. Крменчук, вул. Олександрійська, 18',
  image: '23_bg.jpg',
  ogType: 'website',
  imageHeight: 883,
  imageWidth: 1440,
};

Meta.propTypes = {
  title: string,
  description: string,
  image: string,
  ogType: string,
  imageWidth: number,
  imageHeight: number,
};

export default Meta;
