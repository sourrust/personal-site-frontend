import React from 'react';
import Head  from 'next/head';
import isNil from 'lodash/isNil';
import map   from 'lodash/map';

import {
    GetServerSidePropsContext as Context,
    GetServerSidePropsResult as ServerResult,
} from 'next';

import Company    from '../../types/Company';
import Error      from '../_error';
import Project    from '../../components/Project';
import Resume     from '../../components/Resume';
import fetchAPI   from '../../utility/fetchAPI';

type ServerProps = { [key: string]: any };

interface InformationProps {
    company: Company;
}

function Information({ company }: InformationProps) {
    const projectComponents = map(company.projects, (project) => (
        <Project key={ project.slug } project={ project } />
    ));

    return (
        <section className="information">
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <p className="card-header-title">{ company.name }</p>
                    </div>
                    <div className="card-content">
                        <article className="projects">
                            { projectComponents }
                        </article>
                        <hr />
                        <Resume />
                    </div>
                </div>
            </div>
        </section>
    );
}

interface Props {
    company?: Company;
    statusCode: number;
}

function Page({ company, statusCode }: Props) {
    if (isNil(company)) {
        return <Error statusCode={ statusCode } />;
    }

    return (
        <React.Fragment>
            <Head>
                <title>
                    { company.name }
                    {' '}
                    | Jeremy Hull
                </title>
            </Head>
            <Information company={ company } />
        </React.Fragment>
    );
}

Page.defaultProps = {
    company: null,
};

export async function getServerSideProps(context: Context): Promise<ServerResult<ServerProps>> {
    let response;

    try {
        response = await fetchAPI(`/companies/${context.query.slug}`, { isServer: true });
    } catch (error: any) {
        response = { statusCode: error.response.status, payload: null };
    }

    return {
        props: {
            statusCode: response.statusCode,
            company: response.payload || null,
        },
    };
}

export default Page;
