const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withCSS = require('@zeit/next-css');
const compose = require('next-compose-plugins');
const getPathsObject = require("./scripts/getPathsObject");
// const dotEnvResult = require('dotenv').config();
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();

const withNextEnv = nextEnv();

const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module|quill-image-rotate-module)/,
      loader: 'babel-loader',
    });
    config.plugins.push(new webpack.ProvidePlugin({
      'window.Quill': 'quill'
    }))
    return config;
  },
  exportPathMap: function() {
    const fileObj = getPathsObject();
    return {
      ...fileObj,
      "/": { page: "/" }
    };
  }
};

module.exports = compose([
  [withImages], [withSass], [withCSS], [withNextEnv]
], nextConfig);
