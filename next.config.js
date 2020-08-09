'use strict';

require('dotenv').config();

const isDevelopment = process.env.NODE_ENV !== 'production';

function getDevelopmentBaseUrl() {
    const result    = {};
    const localhost = 'http://localhost:1337';

    if (process.env.MACHINE_ENV === 'docker') {
        result.server = 'http://personal-site.backend:1337';
        result.client = localhost;
    } else {
        result.server = localhost;
        result.client = localhost;
    }

    return result;
}

function getProductionBaseUrl() {
    const result  = {};
    const backend = 'https://cms.jeremy-hull.com';

    if (process.env.MACHINE_ENV === 'docker') {
        result.server = 'http://personal-site.backend:80';
        result.client = backend;
    } else {
        result.server = backend;
        result.client = backend;
    }

    return result;
}

function getBaseUrl() {
    return isDevelopment
        ? getDevelopmentBaseUrl()
        : getProductionBaseUrl();
}

module.exports = {
    poweredByHeader: false,
    env: {
        GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
        BASE_CMS_URL: getBaseUrl()
    },
    sassLoaderOptions: {
        includePaths: ['node_modules'],
        outputStyle: 'compressed'
    }
};
