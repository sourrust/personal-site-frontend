import isEmpty from 'lodash/isEmpty';

interface Options {
    method?: string;
}

function isGetMethod(options: Options) {
    return isEmpty(options) || options.method === 'get';
}

function createCache() {
    const data = new Map<string, any>();

    function has(url: string, options: Options) {
        if (!isGetMethod(options)) {
            return false;
        }

        return data.has(url);
    }

    function get(url: string) {
        return data.get(url);
    }

    function set(url: string, options: Options, value: any) {
        if (!isGetMethod(options)) {
            return value;
        }

        data.set(url, value);

        return value;
    }

    return { has, get, set };
}

export default createCache;
