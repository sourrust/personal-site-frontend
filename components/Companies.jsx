import React from 'react';
import map   from 'lodash/map';

import Company           from './Company';
import OSI               from './icons/OSI';
import EllipsisH         from './icons/EllipsisH';
import OffMadisonAve     from './icons/OffMadisonAve';
import DesignWorksGaming from './icons/DesignWorksGaming';

const icon = {
    'design-works-gaming': <DesignWorksGaming />,
    'off-madison-ave': <OffMadisonAve />,
    'open-source': <OSI />
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
        element: <EllipsisH />
    };

    const moreElement = excludeMore
        ? null
        : <Company
              size={ size }
              element={ <EllipsisH /> }
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
