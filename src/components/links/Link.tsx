import React from 'react';

interface Props {
    IconComponent: (props: any) => JSX.Element;
    className: string;
    href: string;
}

function Link({ IconComponent, className, href }: Props) {
    return (
        <a
            className={ className }
            href={ href }
            rel="noopener noreferrer"
            target="_blank"
        >
            <IconComponent />
        </a>
    );
}

export default Link;
