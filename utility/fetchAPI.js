import axios   from 'axios';
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
        ? await axios.get(url)
        : await axios(url, options);

    return cache.set(routeUrl, options, response.data);
}

export default fetchAPI;
