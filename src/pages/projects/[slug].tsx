import React      from 'react';
import Head       from 'next/head';
import isEmpty    from 'lodash/isEmpty';
import isNil      from 'lodash/isNil';
import map        from 'lodash/map';

import { FaLink as LinkIcon } from 'react-icons/fa';
import {
    GetServerSidePropsContext as Context,
    GetServerSidePropsResult as ServerResult,
} from 'next';

import Company    from '../../types/Company';
import Contact    from '../../components/Contact';
import Error      from '../_error';
import Footer     from '../../components/Footer';
import Navigation from '../../components/Navigation';
import Project    from '../../types/Project';
import Resume     from '../../components/Resume';

import { fetchAPI, htmlToReact } from '../../utility';

type ServerProps = { [key: string]: any };

interface ProjectLinkProps {
    url?: string;
}

function ProjectLink({ url }: ProjectLinkProps) {
    if (isEmpty(url)) {
        return null;
    }

    return (
        <React.Fragment>
            {' '}
            <a
                className="button is-white"
                target="_blank"
                rel="noopener noreferrer"
                title="Website"
                href={ url }
            >
                <LinkIcon className="react-icon" />
            </a>
        </React.Fragment>
    );
}

ProjectLink.defaultProps = {
    url: '',
};

interface ProjectSummaryProps {
    summary?: string;
}

function ProjectSummary({ summary }: ProjectSummaryProps) {
    if (isEmpty(summary)) {
        return null;
    }

    return (
        <blockquote className="summary">
            { summary }
        </blockquote>
    );
}

ProjectSummary.defaultProps = {
    summary: '',
};

interface ProjectDescriptionProps {
    description?: string;
}

function ProjectDescription({ description }: ProjectDescriptionProps) {
    if (isNil(description)) {
        return null;
    }

    return htmlToReact(description) as JSX.Element;
}

ProjectDescription.defaultProps = {
    description: '',
};

interface ProjectProps {
    project: Project;
}

function ProjectComponent({ project }: ProjectProps) {
    return (
        <div id={ project.slug } className="content project">
            <h2>
                { project.name }
                <ProjectLink url={ project.url } />
            </h2>
            <ProjectSummary summary={ project.summary } />
            <ProjectDescription description={ project.description } />
        </div>
    );
}

interface InformationProps {
    company: Company;
}

function Information({ company }: InformationProps) {
    const projectComponents = map(company.projects, (project) => (
        <ProjectComponent key={ project.slug } project={ project } />
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
            <Navigation />
            <Information company={ company } />
            <Contact />
            <Footer />
        </React.Fragment>
    );
}

Page.defaultProps = {
    company: null,
};

export async function getServerSideProps(context: Context): Promise<ServerResult<ServerProps>> {
    let response;

    try {
        const isServer = true;

        response = await fetchAPI(`/companies/${context.query.slug}`, { isServer });
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
