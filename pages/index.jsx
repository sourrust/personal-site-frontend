import React      from 'react';
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

function Information({ companies }) {
    return (
        <div className="information">
            <div className="container">
                <div className="card">
                    <div className="card-content">
                        <AboutMe />
                        <Companies companies={ companies } size={ 3 } />
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
            <Summary />
            <Information companies={ companies } />
            <Contact />
            <Footer />
        </React.Fragment>
    );
}

Page.getInitialProps = async function() {
    const response = await fetchAPI('/companies', {
        method: 'get',
        params: {
            _limit: 3
        }
    });

    return { companies: response.payload };
};

export default Page;
