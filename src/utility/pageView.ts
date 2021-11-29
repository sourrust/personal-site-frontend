import noop from 'lodash/noop';

function pageView(url) {
    const tracker = window.gtag || noop;
    const options = { page_path: url };

    tracker('config', process.env.GOOGLE_ANALYTICS_ID, options);
}

export default pageView;
