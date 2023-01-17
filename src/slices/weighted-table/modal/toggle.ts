import { PayloadAction } from '@reduxjs/toolkit';

import isEmpty from 'lodash/isEmpty';

import Modal     from '../../../types/WeightedTableModal';
import ModalType from '../../../types/WeightedTableModalType';

interface InputState {
    name: string;
    weight: string;
    type: ModalType;
}

function toggle(state: Modal, action: PayloadAction<InputState>) {
    if (isEmpty(action.payload)) {
        return state;
    }

    const isActive = !state.isActive;

    return { ...state, ...action.payload, isActive };
}

export default toggle;
