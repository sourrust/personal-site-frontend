import React from 'react';
import Link  from 'next/link';
import isNil from 'lodash/isNil';

import Company from '../../types/Company';

interface Props {
    company: Company;
    element: JSX.Element;
    size: number;
}

function getSubtitle(company: Company) {
    if (!isNil(company.subtitle)) {
        return company.subtitle;
    }

    return (company.project_count || 0) > 1
        ? `${company.project_count} Projects`
        : `${company.project_count} Project`;
}

function CompanyComponent({ company, element, size }: Props) {
    const hasNoSlug = isNil(company.slug);

    const href   = hasNoSlug ? '/projects' : '/projects/[slug]';
    const asHref = hasNoSlug ? undefined : `/projects/${company.slug}`;

    const className = `company column is-${size}`;
    const subtitle  = getSubtitle(company);

    return (
        <Link href={ href } as={ asHref } passHref>
            <a href="/" className={ className }>
                { element }
                <h4 className="title">{ company.name }</h4>
                <h5 className="subtitle">{ subtitle }</h5>
            </a>
        </Link>
    );
}

export default CompanyComponent;
