import React      from 'react';
import Head       from 'next/head';
import Companies  from '../../components/Companies';
import Company    from '../../types/Company';
import Resume     from '../../components/Resume';
import fetchAPI   from '../../utility/fetchAPI';

interface Props {
    companies: Company[];
}

function Page({ companies }: Props) {
    return (
        <React.Fragment>
            <Head>
                <title>Projects | Jeremy Hull</title>
            </Head>
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
