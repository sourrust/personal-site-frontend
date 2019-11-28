import isEmpty from 'lodash/isEmpty';

function isGetMethod(options) {
    return isEmpty(options) || options.method === 'get';
}

function createCache() {
    const data = new Map();

    function has(url, options) {
        if (!isGetMethod(options)) {
            return false;
        }

        return data.has(url);
    }

    function get(url, options) {
        return data.get(url);
    }

    function set(url, options, value) {
        if (!isGetMethod(options)) {
            return value;
        }

        data.set(url, value);

        return value;
    }

    return { has, get, set };
}

export default createCache;
