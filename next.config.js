'use strict';

const withSass = require('@zeit/next-sass');

require('dotenv').config();

module.exports = withSass({
    env: {
        GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID
    },
    sassLoaderOptions: {
        includePaths: ['node_modules'],
        outputStyle: 'compressed'
    }
});
