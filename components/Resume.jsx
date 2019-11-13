import React from 'react';
import map   from 'lodash/map';

import AngleDown    from './icons/AngleDown';
import trackerEvent from '../utility/trackerEvent';

const baseUrl = '//splash.nyc3.cdn.digitaloceanspaces.com/personal-site/downloads/jeremy-hull-resume';
const items = [
    { name: 'microsoft_word_document', type: '.doc' },
    { name: 'portable_document_format', type: '.pdf' },
    { name: 'plain_text', type: '.txt' }
];

function handleClick(name) {
    return () => trackerEvent(`resume_${name}`, 'download');
}

function Resume() {
    const dropdownItems = map(items, item =>
        <a
            key={ item.type }
            className="dropdown-item"
            onClick={ handleClick(item.name) }
            href={ baseUrl + item.type }
            target="_blank"
            download>
            { item.type }
        </a>
    );

    return (
        <section id="resume" className="section">
            <div className="resume-items">
                <p className="subtitle">
                    Want to get my resume? Hover on the button below and pick
                    your preferred file format to download.
                </p>
                <div className="dropdown is-hoverable">
                    <div className="dropdown-trigger">
                        <button
                            type="button"
                            className="button is-medium is-outlined"
                            aria-haspopup
                            aria-controls="dropdown-menu4">
                            <span>Resume</span>
                            <span className="icon is-small">
                                <AngleDown />
                            </span>
                        </button>
                    </div>
                    <div className="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                            { dropdownItems }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Resume;
