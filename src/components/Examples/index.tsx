import React from 'react';
import map   from 'lodash/map';

import { FaTable as TableIcon } from 'react-icons/fa';

import ExampleComponent from './Example';
import Example          from '../../types/Example';

const examples: Example[] = [
    {
        name: 'Weighted Table',
        slug: 'weighted-table',
        image: <TableIcon className="react-icon" />,
    },
];

function Examples() {
    const exampleComponents = map(examples, (example) => (
        <ExampleComponent
            key={ example.slug }
            example={ example }
        />
    ));

    return (
        <section id="examples" className="section">
            <div className="columns">
                { exampleComponents }
            </div>
        </section>
    );
}

export default Examples;
