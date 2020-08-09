import Head  from 'next/head';
import React from 'react';

import Contact    from '../components/Contact';
import Navigation from '../components/Navigation';
import Footer     from '../components/Footer';

function Page() {
    return (
        <React.Fragment>
            <Head>
                <title>404 | Jeremy Hull</title>
            </Head>
            <section className="summary hero is-fullheight">
                <div className="hero-header">
                    <Navigation />
                </div>
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">404</h1>
                        <h2 className="subtitle">
                            No page was found
                        </h2>
                    </div>
                </div>
            </section>
            <Contact />
            <Footer />
        </React.Fragment>
    );
}

export default Page;
