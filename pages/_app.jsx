import App    from 'next/app';
import Head   from 'next/head';
import React  from 'react';
import Router from 'next/router';

import pageView from '../utility/pageView';

import '../scss/index.scss';

function BaseApplication({ Component, pageProps }) {
    React.useEffect(() => {
        Router.events.on('routeChangeStart', pageView);

        return () => Router.events.off('routeChangeStart', pageView);
    });

    return (
        <React.Fragment>
            <Head>
                <title>Jeremy Hull</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1" />
            </Head>
            <Component { ...pageProps } />
        </React.Fragment>
    );
}

export default BaseApplication;
