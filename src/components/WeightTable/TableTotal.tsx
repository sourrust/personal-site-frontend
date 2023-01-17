import React from 'react';
import sumBy from 'lodash/sumBy';

import ItemWeight from '../../types/ItemWeight';

interface Props {
    items: ItemWeight[];
}

function TableTotal({ items }: Props) {
    const classes = ['notification', 'is-light'];
    const weightTotal = sumBy(items, 'weight');

    let message = '';

    if (weightTotal !== 100) {
        message = 'Weighted table should equal 100 for randomizer to be enabled';

        classes.push('is-danger');
    } else {
        classes.push('is-info');
    }

    return (
        <div id="weight-total" className={ classes.join(' ') }>
            <div className="columns">
                <div className="column is-2">
                    <strong>Weight Total</strong>: { weightTotal } 
                </div>
                <div className="column">
                    { message }
                </div>
            </div>
        </div>
    );
}

export default TableTotal;
