import axios   from 'axios';
import isEmpty from 'lodash/isEmpty';

async function fetchAPI(routeUrl, options) {
    const url = process.env.BASE_CMS_URL + routeUrl;

    const response = isEmpty(options)
        ? await axios.get(url)
        : await axios(url, options);

    return response.data;
}

export default fetchAPI;
