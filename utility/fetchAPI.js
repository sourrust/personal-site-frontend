import extend  from 'lodash/extend';
import fetch   from 'isomorphic-unfetch';
import isEmpty from 'lodash/isEmpty';

import createCache from './cache';

const cache = createCache();

async function fetchAPI(routeUrl, initialOptions) {
    const baseCMS = process.env.BASE_CMS_URL;
    const options = extend({}, initialOptions);
    const baseUrl = options.isServer ? baseCMS.server : baseCMS.client;

    const url = baseUrl + routeUrl;

    delete options.isServer;

    if (cache.has(routeUrl, options)) {
        return cache.get(routeUrl, options);
    }

    const response = isEmpty(options)
        ? await fetch(url)
        : await fetch(url, options);

    const data = await response.json();

    return cache.set(routeUrl, options, data);
}

export default fetchAPI;
