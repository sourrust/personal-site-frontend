import React      from 'react';
import Head       from 'next/head';
import Companies  from '../../components/Companies';
import Contact    from '../../components/Contact';
import Footer     from '../../components/Footer';
import Navigation from '../../components/Navigation';
import Resume     from '../../components/Resume';
import fetchAPI   from '../../utility/fetchAPI';

function Information({ companies }) {
    return (
        <div className="information">
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
        </div>
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

Page.getInitialProps = async function() {
    const response = await fetchAPI('/companies');

    return { companies: response.payload };
};

export default Page;
