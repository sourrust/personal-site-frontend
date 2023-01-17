import React from 'react';

import { useSelector } from 'react-redux';

import TableDisplay   from './TableDisplay';
import TableForm      from './Form';
import TableModal     from './Modal';
import TableTotal     from './TableTotal';
import { StoreState } from '../../store';

function getItems(state: StoreState) {
    return state.weightedTable.items;
}

function WeightTable() {
    const items = useSelector(getItems);

    return (
        <React.Fragment>
            <TableTotal items={ items } />
            <TableForm items={ items } />
            <TableDisplay items={ items } />
            <TableModal />
        </React.Fragment>
    );
}

export default WeightTable;
