import React from 'react';

function Svg({ path, title, viewBox }) {
    const className = `svg-inline--fa fa-${title}`;

    return (
        <svg
            className={ className }
            aria-hidden
            data-prefix="fas"
            data-icon={ title }
            data-fa-i2svg=""
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={ viewBox }>
            <path fill="currentColor" d={ path } />
        </svg>
    );
}

export default Svg;
