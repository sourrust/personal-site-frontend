import isEmpty from 'lodash/isEmpty';
import map     from 'lodash/map';

function toQueryString(params) {
    if (isEmpty(params)) {
        return '';
    }

    const queries = map(params, function(value, key) {
        return `${key}=${value}`;
    });

    return queries.join('&');
}

export default toQueryString;
