import React from 'react';

import Description from './Description';
import LinkIcon    from './LinkIcon';
import Project     from '../../types/Project';
import Summary     from './Summary';

interface Props {
    project: Project;
}

function ProjectComponent({ project }: Props) {
    return (
        <div id={ project.slug } className="content project">
            <h2>
                { project.name }
                <LinkIcon url={ project.url } />
            </h2>
            <Summary summary={ project.summary } />
            <Description description={ project.description } />
        </div>
    );
}

export default ProjectComponent;
