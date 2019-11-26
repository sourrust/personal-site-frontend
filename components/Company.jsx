import React from 'react';
import Link  from 'next/link';
import isNil from 'lodash/isNil';

function Company({ company, element, size }) {
    const hasNoSlug = isNil(company.slug);

    const href   = hasNoSlug ? '/projects' : '/projects/[slug]';
    const asHref = hasNoSlug ? null : `/projects/${company.slug}`;

    const className = `company column is-${size}`;
    const subtitle  = company.subtitle || `${company.project_count} Projects`;

    return (
        <Link href={ href } as={ asHref }>
            <a className={ className }>
                { element }
                <h4 className="title">{ company.name }</h4>
                <h5 className="subtitle">{ subtitle }</h5>
            </a>
        </Link>
    );
}

export default Company;
