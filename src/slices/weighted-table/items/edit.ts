import isNil from 'lodash/isNil';
import map   from 'lodash/map';

import { PayloadAction } from '@reduxjs/toolkit';

import ItemWeight from '../../../types/ItemWeight';

function editItem(state: ItemWeight[], action: PayloadAction<ItemWeight>) {
    if (isNil(action.payload)) {
        return state;
    }

    return map(state, (item) => ((item.slug !== action.payload.slug) ? item : action.payload));
}

export default editItem;
