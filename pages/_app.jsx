import App    from 'next/app';
import Head   from 'next/head';
import React  from 'react';
import Router from 'next/router';

import pageView from '../utility/pageView';

import '../scss/index.scss';

class BaseApplication extends App {
    componentDidMount() {
        Router.events.on('routeChangeStart', pageView);
    }

    componentWillUnmount() {
        Router.events.off('routeChangeStart', pageView);
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <React.Fragment>
                <Head>
                    <title>Jeremy Hull</title>
                </Head>
                <Component { ...pageProps } />
            </React.Fragment>
        );
    }
}

export default BaseApplication;
