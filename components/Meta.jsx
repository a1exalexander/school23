/* eslint-disable react/no-danger */
import React from 'react';
import Head from 'next/head';
import { node, number, string } from 'prop-types';
import { siteUrl } from '../next-sitemap';

const defaultTitle = 'Кременчуцька гімназія №23';

export const Meta = ({ title, description, image, ogType, imageWidth, imageHeight, children }) => {
  const formatedTitle = `${title}${title !== defaultTitle ? ` | ${defaultTitle}` : ''}`;
  return (
    <Head>
      {process.env.NODE_ENV === 'production' && (
        <script
          dangerouslySetInnerHTML={{
            __html: `(function (h, o, t, j, a, r) {
      h.hj =
        h.hj ||
        function () {
          (h.hj.q = h.hj.q || []).push(arguments);
        };
      h._hjSettings = { hjid: 2083064, hjsv: 6 };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script');
      r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=')`
          }}
        />
      )}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="author" content="Alex Ratushnyi" />
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="гимназия 23, гімназія 23, 23 школа кременчуг, school 23, school 23 kremenchuk, 23 школа, кременчук, 23 школа кременчук, ЗОШ 23, ЗОШ 23 кременчук"
      />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content="uk_UA" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={formatedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image:width" content={imageWidth} />
      <meta property="og:image:height" content={imageHeight} />
      <meta property="og:image" content={`${siteUrl}/images/${image}`} />
      <script src="https://kit.fontawesome.com/144e77a10a.js" crossOrigin="anonymous" />
      <title>{formatedTitle}</title>
      {children}
    </Head>
  );
};

Meta.defaultProps = {
  title: defaultTitle,
  description:
    'Кременчуцька гімназія №23. 39600, Україна, Полтавська область, м. Кременчук, вул. Олександрійська, 18 | Школа 23',
  image: '23_bg.jpg',
  ogType: 'website',
  imageHeight: 883,
  imageWidth: 1440,
  children: undefined
};

Meta.propTypes = {
  title: string,
  description: string,
  image: string,
  ogType: string,
  imageWidth: number,
  imageHeight: number,
  children: node
};

export default Meta;
