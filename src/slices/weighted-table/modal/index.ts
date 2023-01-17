import { createSlice } from '@reduxjs/toolkit';

import ModalState from '../../../types/WeightedTableModal';
import ModalType  from '../../../types/WeightedTableModalType';

import toggle      from './toggle';
import inputChange from './inputChange';

const slice = createSlice({
    name: 'items',
    initialState: {
        isActive: false,
        name: '',
        weight: '',
        type: ModalType.Create,
    } as ModalState,
    reducers: {
        inputChange,
        toggle,
    },
});

export default slice;
