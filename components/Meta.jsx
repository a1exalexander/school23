import React from 'react';
import Head from 'next/head';
import { number, string } from 'prop-types';
import { siteUrl } from '../next-sitemap';

const Meta = ({ title, description, image, ogType, imageWidth, imageHeight }) => (
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
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image:width" content={imageWidth} />
    <meta property="og:image:height" content={imageHeight} />
    <meta property="og:image" content={`${siteUrl}/images/${image}`} />
    <title>{title}</title>
  </Head>
);

Meta.defaultProps = {
  title: 'Кременчуцька школа №23',
  description: 'Привіт! Це сайт Кременчуцької школи №23, Полтавської області',
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
