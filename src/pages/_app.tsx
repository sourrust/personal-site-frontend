import { AppProps as Props } from 'next/app';

import Head   from 'next/head';
import React  from 'react';
import Router from 'next/router';

import pageView from '../utility/pageView';

import '../scss/index.scss';

function BaseApplication({ Component, pageProps }: Props) {
    React.useEffect(() => {
        Router.events.on('routeChangeStart', pageView);

        return () => Router.events.off('routeChangeStart', pageView);
    }, [Router]);

    return (
        <React.Fragment>
            <Head>
                <title>Jeremy Hull</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <Component { ...pageProps } />
        </React.Fragment>
    );
}

export default BaseApplication;
