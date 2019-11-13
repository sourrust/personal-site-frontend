import App   from 'next/app';
import Head  from 'next/head';
import React from 'react';

import '../scss/index.scss';

class BaseApplication extends App {
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
