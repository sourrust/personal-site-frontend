import extend  from 'lodash/extend';
import fetch   from 'isomorphic-unfetch';
import isEmpty from 'lodash/isEmpty';

import createCache from './cache';

interface Options extends RequestInit {
    isServer?: boolean;
}

interface BaseCMSUrl {
    server: string;
    client: string;
}

const cache = createCache();

async function fetchAPI(routeUrl: string, initialOptions: Options) {
    const baseCMS = process.env.BASE_CMS_URL as unknown as BaseCMSUrl;
    const options = extend({}, initialOptions);
    const baseUrl = options.isServer ? baseCMS.server : baseCMS.client;

    const url = baseUrl + routeUrl;

    delete options.isServer;

    if (cache.has(routeUrl, options)) {
        return cache.get(routeUrl);
    }

    const response = isEmpty(options)
        ? await fetch(url)
        : await fetch(url, options);

    const data = await response.json();

    return cache.set(routeUrl, options, data);
}

export default fetchAPI;
