import React from 'react';
import Link  from 'next/link';

import Example from '../../types/Example';

interface Props {
    example: Example;
}

function ExampleComponent({ example }: Props) {
    const href = `/examples/${example.slug}`;

    return (
        <Link href={ href } passHref>
            <a href="/" className="example column is-2">
                { example.image }
                <h4 className="title">{ example.name }</h4>
            </a>
        </Link>
    );
}

export default ExampleComponent;
