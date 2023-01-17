import isNil  from 'lodash/isNil';

import { PayloadAction } from '@reduxjs/toolkit';

import ItemWeight from '../../../types/ItemWeight';

function addItem(state: ItemWeight[], action: PayloadAction<ItemWeight>) {
    if (isNil(action.payload)) {
        return state;
    }

    return state.concat(action.payload);
}

export default addItem;
