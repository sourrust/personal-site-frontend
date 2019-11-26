'use strict';

const withSass = require('@zeit/next-sass');

require('dotenv').config();

const isDevelopment = process.env.NODE_ENV !== 'production';
const baseUrl = isDevelopment
  ? 'http://localhost:1337'
  : 'https://cms.jeremy-hull.com';

module.exports = withSass({
    poweredByHeader: false,
    env: {
        GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
        BASE_CMS_URL: baseUrl
    },
    sassLoaderOptions: {
        includePaths: ['node_modules'],
        outputStyle: 'compressed'
    }
});
