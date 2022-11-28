import { PayloadAction } from '@reduxjs/toolkit';

import Modal from '../../../types/WeightedTableModal';

interface ModalInput {
    name: string;
    value: string;
}

function inputChange(state: Modal, action: PayloadAction<ModalInput>) {
    const { name, value } = action.payload;

    return { ...state, [name]: value };
}

export default inputChange;
