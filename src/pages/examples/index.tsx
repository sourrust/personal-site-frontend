import React from 'react';
import Head  from 'next/head';

import Examples from '../../components/Examples';
import Resume   from '../../components/Resume';

function Page() {
    return (
        <React.Fragment>
            <Head>
                <title>Examples | Jeremy Hull</title>
            </Head>
            <section className="information">
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <p className="card-header-title">Examples</p>
                        </div>
                        <div className="card-content">
                            <Examples />
                            <hr />
                            <Resume />
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default Page;
