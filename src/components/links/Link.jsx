import React from 'react';

function Link({ IconComponent, className, href }) {
    return (
        <a
            className={ className }
            href={ href }
            rel="noopener noreferrer"
            target="_blank">
            <IconComponent />
        </a>
    );
}

export default Link;
