import Head  from 'next/head';
import React from 'react';

import NavigationHero from '../components/NavigationHero';

function Page() {
    return (
        <React.Fragment>
            <Head>
                <title>404 | Jeremy Hull</title>
            </Head>
            <NavigationHero>
                <div className="container has-text-centered">
                    <h1 className="title">404</h1>
                    <h2 className="subtitle">
                        No page was found
                    </h2>
                </div>
            </NavigationHero>
        </React.Fragment>
    );
}

export default Page;
