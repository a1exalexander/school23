const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withCSS = require('@zeit/next-css');
const compose = require('next-compose-plugins');
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
const getPathsObject = require('./scripts/getPathsObject');

dotenvLoad();

const withNextEnv = nextEnv();

const nextConfig = {
  webpack: (config, { webpack }) => {
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module|quill-image-rotate-module)/,
      loader: 'babel-loader'
    });
    config.plugins.push(
      new webpack.ProvidePlugin({
        'window.Quill': 'quill'
      })
    );
    return config;
  },
  exportPathMap: () => {
    const fileObj = getPathsObject();
    return {
      ...fileObj,
      '/': { page: '/' },
      '/index': { page: '/' },
      '/news/index': { page: '/news' }
    };
  },
  images: { domains: ['localhost', 'firebasestorage.googleapis.com', 'https://school23.vercel.app'] }
};

module.exports = compose([[withImages], [withSass], [withCSS], [withNextEnv]], nextConfig);
