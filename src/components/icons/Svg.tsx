import React from 'react';

interface Props {
    path: string;
    title: string;
    viewBox: string;
}

function Svg({ path, title, viewBox }: Props) {
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
            viewBox={ viewBox }
        >
            <path fill="currentColor" d={ path } />
        </svg>
    );
}

export default Svg;
