import isEmpty       from 'lodash/isEmpty';
import toQueryString from './toQueryString';

function isGetMethod(options) {
    return isEmpty(options) || options.method === 'get';
}

function createKey(url, options) {
    return url + toQueryString(options.params);
}

function createCache() {
    const data = new Map();

    function has(url, options) {
        if (!isGetMethod(options)) {
            return false;
        }

        const key = createKey(url, options);

        return data.has(key);
    }

    function get(url, options) {
        const key = createKey(url, options);

        return data.get(key);
    }

    function set(url, options, value) {
        const key = createKey(url, options);

        data.set(key, value);

        return value;
    }

    return { has, get, set };
}

export default createCache;
