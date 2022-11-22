import isEmpty from 'lodash/isEmpty';
import map     from 'lodash/map';

function toQueryString(params: { [key: string]: string }) {
    if (isEmpty(params)) {
        return '';
    }

    const queries = map(params, (value, key) => `${key}=${value}`);

    return queries.join('&');
}

export default toQueryString;
