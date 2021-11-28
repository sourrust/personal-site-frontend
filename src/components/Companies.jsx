import React from 'react';
import map   from 'lodash/map';

import {
    FaEllipsisH as EllipsisH,
    FaOsi as OSI
} from 'react-icons/fa';

import Company           from './Company';
import DesignWorksGaming from './icons/DesignWorksGaming';
import OffMadisonAve     from './icons/OffMadisonAve';
import Runbeck           from './icons/Runbeck';

const icon = {
    'design-works-gaming': <DesignWorksGaming />,
    'off-madison-ave': <OffMadisonAve />,
    'open-source': <OSI className="react-icon" />,
    'runbeck-election-services': <Runbeck />
};

function Companies({ companies, size, excludeMore }) {
    const companyComponents = map(companies, company =>
        <Company
            key={ company.slug }
            size={ size }
            element={ icon[company.slug] }
            company={ company } />);

    const moreInformation = {
        name: 'More',
        subtitle: 'See All Projects',
    };

    const moreElement = excludeMore
        ? null
        : <Company
              size={ size }
              element={ <EllipsisH className="react-icon" /> }
              company={ moreInformation } />;

    return (
        <section id="companies" className="section">
            <div className="columns">
                { companyComponents }
                { moreElement }
            </div>
        </section>
    );
}

export default Companies;
