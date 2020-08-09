import Head  from 'next/head';
import React from 'react';

import Contact    from '../components/Contact';
import Navigation from '../components/Navigation';
import Footer     from '../components/Footer';

const statusCodes = {
    400: 'Bad Request',
    404: 'No page was found',
    500: 'Internal Server Error',
    501: 'Not Implemented'
};

function getStatusCode(response, error) {
    if (response && response.statusCode) {
        return response.statusCode;
    }

    return error ? error.statusCode : 404;
}

function BaseError({ statusCode }) {
    return (
        <React.Fragment>
            <Head>
                <title>
                    { statusCode }
                    {' '}
| Jeremy Hull
                </title>
            </Head>
            <section className="summary hero is-fullheight">
                <div className="hero-header">
                    <Navigation />
                </div>
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">{ statusCode }</h1>
                        <h2 className="subtitle">
                            { statusCodes[statusCode] }
                        </h2>
                    </div>
                </div>
            </section>
            <Contact />
            <Footer />
        </React.Fragment>
    );
}

BaseError.getInitialProps = function getInitialProps({ res, err }) {
    const statusCode = getStatusCode(res, err);

    return { statusCode };
};

export default BaseError;
