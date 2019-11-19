import React      from 'react';
import Head       from 'next/head';
import extend     from 'lodash/extend';
import htmlParser from 'html-react-parser';
import isEmpty    from 'lodash/isEmpty';
import isNil      from 'lodash/isNil';
import map        from 'lodash/map';
import marked     from 'marked';
import Contact    from '../../components/Contact';
import Error      from '../_error';
import Footer     from '../../components/Footer';
import Link       from '../../components/icons/Link';
import Navigation from '../../components/Navigation';
import Resume     from '../../components/Resume';
import fetchAPI   from '../../utility/fetchAPI';

function ProjectLink({ url }) {
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
                href={ url }>
                <Link />
            </a>
        </React.Fragment>
    );
}

function isAnchorTag(node) {
    return node.type === 'tag' && node.name === 'a';
}

function handleAnchorTagReplace(node) {
    if (!isAnchorTag(node)) {
        return node;
    }

    node.attribs = extend({}, node.attribs, {
        rel: 'noopener noreferrer',
        target: '__blank'
    });

    return node;
}

function ProjectDescription({ description }) {
    if (isNil(description)) {
        return null;
    }

    const html    = marked(description);
    const content = htmlParser(html, { replace: handleAnchorTagReplace });

    return (
        <React.Fragment>
            { content }
        </React.Fragment>
    )
}

function Project({ project }) {
    return (
        <div id={ project.slug } className="content project">
            <h2>
                { project.name }
                <ProjectLink url={ project.url } />
            </h2>
            <blockquote className="summary">
                { project.summary }
            </blockquote>
            <ProjectDescription description={ project.description } />
        </div>
    );
}

function Information({ company }) {
    const projectComponents = map(company.projects, project =>
        <Project key={ project.slug } project={ project } />);

    return (
        <div className="information">
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <p className="card-header-title">{ company.name }</p>
                    </div>
                    <div className="card-content">
                        <div className="projects">
                            { projectComponents  }
                        </div>
                        <hr />
                        <Resume />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Page({ company, statusCode }) {
    if (isNil(company)) {
        return <Error statusCode={ statusCode } />;
    }

    return (
        <React.Fragment>
            <Head>
                <title>{ company.name } | Jeremy Hull</title>
            </Head>
            <Navigation />
            <Information company={ company } />
            <Contact />
            <Footer />
        </React.Fragment>
    );
}

Page.getInitialProps = async function({ query }) {
    let response;

    try {
        response = await fetchAPI(`/companies/${query.slug}`);
    } catch (error) {
        response = { statusCode: error.response.status, payload: null };
    }

    return {
        statusCode: response.statusCode,
        company: response.payload
    };
};

export default Page;
