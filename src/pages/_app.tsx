import { AppProps as Props } from 'next/app';

import Head  from 'next/head';
import React from 'react';

import Router, { Router as RouterClass } from 'next/router';

import Contact        from '../components/Contact';
import Detail         from '../components/Detail';
import Footer         from '../components/Footer';
import Navigation     from '../components/Navigation';
import NavigationHero from '../components/NavigationHero';
import isOkStatusCode from '../utility/isOkStatusCode';
import pageView       from '../utility/pageView';

import '../scss/index.scss';

function IndexFooter() {
    return (
        <NavigationHero>
            <Detail />
        </NavigationHero>
    );
}

function getHeader(router: RouterClass, statusCode: number) {
    if (!isOkStatusCode(statusCode)) {
        return React.Fragment;
    }

    switch (router.route) {
        case '/':
            return IndexFooter;
        case '/400':
        case '/404':
        case '/500':
        case '/501':
            return React.Fragment;
        default:
            return Navigation;
    }
}

function BaseApplication({ Component, router, pageProps }: Props) {
    React.useEffect(() => {
        Router.events.on('routeChangeStart', pageView);

        return () => Router.events.off('routeChangeStart', pageView);
    }, [Router]);

    const Header = getHeader(router, (pageProps as any)?.statusCode ?? 200);

    return (
        <React.Fragment>
            <Head>
                <title>Jeremy Hull</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <Header />
            <Component { ...pageProps } />
            <Contact />
            <Footer />
        </React.Fragment>
    );
}

export default BaseApplication;
