import React      from 'react';
import AboutMe    from '../components/AboutMe';
import Companies  from '../components/Companies';
import Resume     from '../components/Resume';
import fetchAPI   from '../utility/fetchAPI';
import Company    from '../types/Company';
import Highlight  from '../types/Highlight';

interface Props {
    companies: Company[];
    highlights: Highlight[];
}

function Page({ companies, highlights }: Props) {
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

export async function getStaticProps() {
    const isServer  = true;
    const options   = { isServer };
    const responses = await Promise.all([
        fetchAPI('/highlights', options),
        fetchAPI('/companies?_limit=3', options),
    ]);

    return {
        props: {
            highlights: responses[0].payload,
            companies: responses[1].payload,
        },
    };
}

export default Page;
