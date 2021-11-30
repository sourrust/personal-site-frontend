import React  from 'react';
import isNil  from 'lodash/isNil';

import DefaultDetail from './Default';

interface Props {
    Element?: null | (() => JSX.Element);
}

function DetailContent() {
    return (
        <React.Fragment>
            <h1 className="title">
                Hey, I
                {'\''}
                m Jeremy.
            </h1>
            <ul className="subtitle">
                <li>Software Engineer</li>
                <li>Open Source Advocate</li>
                <li>Game Mechanics Spelunker</li>
                <li>Systems Design Nerd</li>
                <li>Recreational Critic</li>
            </ul>
        </React.Fragment>
    );
}

function Detail({ Element }: Props) {
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

Detail.defaultProps = {
    Element: null,
};

export default Detail;
