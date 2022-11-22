import React from 'react';
import map   from 'lodash/map';

import {
    FaEllipsisH as EllipsisH,
    FaOsi as OSI,
} from 'react-icons/fa';

import Company           from '../../types/Company';
import CompanyComponent  from './Company';
import DesignWorksGaming from '../icons/DesignWorksGaming';
import OffMadisonAve     from '../icons/OffMadisonAve';
import Runbeck           from '../icons/Runbeck';

const icon: { [key: string]: JSX.Element } = {
    'design-works-gaming': <DesignWorksGaming />,
    'off-madison-ave': <OffMadisonAve />,
    'open-source': <OSI className="react-icon" />,
    'runbeck-election-services': <Runbeck />,
};

interface Props {
    companies: Company[];
    excludeMore?: boolean;
    size: number;
}

function Companies({ companies, size, excludeMore }: Props) {
    const companyComponents = map(companies, (company) => (
        <CompanyComponent
            key={ company.slug }
            size={ size }
            element={ icon[company.slug] }
            company={ company }
        />
    ));

    const moreInformation = {
        name: 'More',
        subtitle: 'See All Projects',
    };

    const moreElement = excludeMore
        ? null
        : (
            <CompanyComponent
                size={ size }
                element={ <EllipsisH className="react-icon" /> }
                company={ moreInformation as any }
            />
        );

    return (
        <section id="companies" className="section">
            <div className="columns">
                { companyComponents }
                { moreElement }
            </div>
        </section>
    );
}

Companies.defaultProps = {
    excludeMore: false,
};

export default Companies;
