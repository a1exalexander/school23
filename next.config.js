const withSass = require("@zeit/next-sass");
const withImages = require("next-images");
const withCSS = require('@zeit/next-css')
const compose = require('next-compose-plugins');
// const dotEnvResult = require('dotenv').config();
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();

const withNextEnv = nextEnv();

module.exports = compose([[withImages], [withSass], [withCSS], [withNextEnv]]);
