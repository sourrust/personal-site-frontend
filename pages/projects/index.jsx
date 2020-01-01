import React      from 'react';
import Head       from 'next/head';
import isEmpty    from 'lodash/isEmpty';
import Companies  from '../../components/Companies';
import Contact    from '../../components/Contact';
import Footer     from '../../components/Footer';
import Navigation from '../../components/Navigation';
import Resume     from '../../components/Resume';
import fetchAPI   from '../../utility/fetchAPI';

function Information({ companies }) {
    return (
        <section className="information">
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <p className="card-header-title">Projects</p>
                    </div>
                    <div className="card-content">
                        <Companies companies={ companies } size={ 2 } excludeMore />
                        <hr />
                        <Resume />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Page({ companies }) {
    return (
        <React.Fragment>
            <Head>
                <title>Projects | Jeremy Hull</title>
            </Head>
            <Navigation />
            <Information companies={ companies } />
            <Contact />
            <Footer />
        </React.Fragment>
    );
}

Page.getInitialProps = async function({ req }) {
    const isServer = !isEmpty(req);
    const response = await fetchAPI('/companies', { isServer });

    return { companies: response.payload };
};

export default Page;
