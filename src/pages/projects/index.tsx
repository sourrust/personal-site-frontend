import React      from 'react';
import Head       from 'next/head';
import Companies  from '../../components/Companies';
import Company    from '../../types/Company';
import Navigation from '../../components/Navigation';
import Resume     from '../../components/Resume';
import fetchAPI   from '../../utility/fetchAPI';

interface Props {
    companies: Company[];
}

function Information({ companies }: Props) {
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

function Page({ companies }: Props) {
    return (
        <React.Fragment>
            <Head>
                <title>Projects | Jeremy Hull</title>
            </Head>
            <Navigation />
            <Information companies={ companies } />
        </React.Fragment>
    );
}

export async function getStaticProps() {
    const isServer = true;
    const response = await fetchAPI('/companies', { isServer });

    return {
        props: { companies: response.payload },
    };
}

export default Page;
