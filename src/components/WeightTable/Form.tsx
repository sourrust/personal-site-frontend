import React from 'react';

import AddItem    from './AddItem';
import ItemWeight from '../../types/ItemWeight';
import Randomizer from './Randomizer';

interface Props {
    items: ItemWeight[];
}

function Form({ items }: Props) {
    return (
        <div className="columns">
            <Randomizer items={ items } />
            <AddItem items={ items } />
        </div>
    );
}

export default Form;
