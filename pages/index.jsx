import React      from 'react';
import isEmpty    from 'lodash/isEmpty';
import AboutMe    from '../components/AboutMe';
import Companies  from '../components/Companies';
import Contact    from '../components/Contact';
import Detail     from '../components/detail';
import Footer     from '../components/Footer';
import Navigation from '../components/Navigation';
import Resume     from '../components/Resume';
import fetchAPI   from '../utility/fetchAPI';

function Summary() {
    return (
        <section className="summary hero is-fullheight">
            <div className="hero-header">
                <Navigation />
            </div>
            <div className="hero-body">
                <Detail />
            </div>
        </section>
    );
}

function Information({ companies, highlights }) {
    return (
        <section className="information">
            <div className="container">
                <div className="card">
                    <div className="card-content">
                        <AboutMe highlights={ highlights } />
                        <Companies companies={ companies } size={ 3 } />
                        <hr />
                        <Resume />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Page(props) {
    return (
        <React.Fragment>
            <Summary />
            <Information { ...props } />
            <Contact />
            <Footer />
        </React.Fragment>
    );
}

Page.getInitialProps = async function({ req }) {
    const isServer  = !isEmpty(req);
    const options   = { isServer };
    const responses = await Promise.all([
        fetchAPI('/highlights', options),
        fetchAPI('/companies?_limit=3', options)
    ]);

    return {
        highlights: responses[0].payload,
        companies: responses[1].payload
    };
};

export default Page;
