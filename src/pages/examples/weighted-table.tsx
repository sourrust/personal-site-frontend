import React from 'react';
import Head  from 'next/head';

import { Provider } from 'react-redux';

import Resume      from '../../components/Resume';
import WeightTable from '../../components/WeightTable';
import store       from '../../store';

function Page() {
    return (
        <Provider store={ store }>
            <Head>
                <title>Weighted Table | Jeremy Hull</title>
            </Head>
            <section className="information">
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <p className="card-header-title">Weighted Table</p>
                        </div>
                        <div className="card-content">
                            <WeightTable />
                            <hr />
                            <Resume />
                        </div>
                    </div>
                </div>
            </section>
        </Provider>
    );
}

export default Page;
