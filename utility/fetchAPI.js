import fetch   from 'isomorphic-unfetch';
import isEmpty from 'lodash/isEmpty';

import createCache from './cache';

const cache = createCache();

async function fetchAPI(routeUrl, initialOptions) {
    const url     = process.env.BASE_CMS_URL + routeUrl;
    const options = initialOptions || {};

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
