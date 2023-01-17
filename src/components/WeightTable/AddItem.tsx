import React from 'react';
import sumBy from 'lodash/sumBy';

import { FaPlus as PlusIcon } from 'react-icons/fa';
import { useDispatch }        from 'react-redux';

import ItemWeight from '../../types/ItemWeight';
import ModalType  from '../../types/WeightedTableModalType';
import modalSlice from '../../slices/weighted-table/modal';

interface Props {
    items: ItemWeight[];
}

function AddItem({ items }: Props) {
    const dispatch    = useDispatch();
    const weightTotal = sumBy(items, 'weight');
    const isDisabled  = weightTotal === 100;

    function toggleModal() {
        dispatch(modalSlice.actions.toggle({
            name: '',
            weight: '',
            type: ModalType.Create,
        }));
    }

    return (
        <div className="column is-2">
            <button className="button is-dark is-fullwidth" type="button" onClick={ toggleModal } disabled={ isDisabled }>
                <span className="icon">
                    <PlusIcon />
                </span>
                <span>Add Item</span>
            </button>
        </div>
    );
}

export default AddItem;
