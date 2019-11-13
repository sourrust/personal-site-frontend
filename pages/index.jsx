import React      from 'react';
import AboutMe    from '../components/AboutMe';
import Companies  from '../components/Companies';
import Contact    from '../components/Contact';
import Detail     from '../components/detail';
import Footer     from '../components/Footer';
import Navigation from '../components/Navigation';
import Projects   from '../components/Projects';
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

function Information() {
    return (
        <div className="information">
            <div className="container">
                <div className="card">
                    <div className="card-content">
                        <AboutMe />
                        <hr />
                        <Projects />
                        <hr />
                        <Resume />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Page() {
    return (
        <React.Fragment>
            <Summary />
            <Information />
            <Contact />
            <Footer />
        </React.Fragment>
    );
}

export default Page;
