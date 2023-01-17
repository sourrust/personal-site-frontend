import { createSlice } from '@reduxjs/toolkit';

import ItemWeight from '../../../types/ItemWeight';
import addItem    from './add';
import deleteItem from './delete';
import editItem   from './edit';

const slice = createSlice({
    name: 'items',
    initialState: [] as ItemWeight[],
    reducers: {
        add: addItem,
        delete: deleteItem,
        edit: editItem,
    },
});

export default slice;
