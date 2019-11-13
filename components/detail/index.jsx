import React  from 'react';
import isNil  from 'lodash/isNil';

import DefaultDetail from './default';

function DetailContent() {
    return [
        <h1 key="title" className="title">Hey, I'm Jeremy.</h1>,
        <ul key="subtitle" className="subtitle">
            <li>Software Engineer</li>
            <li>Open Source Advocate</li>
            <li>Game Mechanics Spelunker</li>
            <li>Systems Design Nerd</li>
            <li>Recreational Critic</li>
        </ul>
    ];
}

function Detail({ Element }) {
    if (isNil(Element)) {
        return <DefaultDetail />;
    }

    return (
        <div className="columns">
            <div className="content column is-half">
                <DetailContent />
            </div>
            <div className="column is-half">
                <Element />
            </div>
        </div>
    );
}

export default Detail;
