import filter from 'lodash/filter';
import isNil  from 'lodash/isNil';

import { PayloadAction } from '@reduxjs/toolkit';

import ItemWeight from '../../../types/ItemWeight';

function deleteItem(state: ItemWeight[], action: PayloadAction<ItemWeight>) {
    if (isNil(action.payload)) {
        return state;
    }

    return filter(state, (item) => item.slug !== action.payload.slug);
}

export default deleteItem;
