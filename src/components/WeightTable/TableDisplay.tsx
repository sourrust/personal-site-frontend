import React from 'react';
import map   from 'lodash/map';

import { useDispatch } from 'react-redux';

import {
    FaPen as EditIcon,
    FaTrashAlt as TrashIcon,
} from 'react-icons/fa';

import ActionButton from './ActionButton';
import ItemWeight   from '../../types/ItemWeight';
import ModalType    from '../../types/WeightedTableModalType';
import itemsSlice   from '../../slices/weighted-table/items';
import modalSlice   from '../../slices/weighted-table/modal';

interface Props {
    items: ItemWeight[];
}

function getModalToggle(item: ItemWeight) {
    return modalSlice.actions.toggle({
        name: item.name,
        weight: `${item.weight}`,
        type: ModalType.Update,
    });
}

function TableDisplay({ items }: Props) {
    const dispatch = useDispatch();

    const itemComponents = map(items, (item, index) => {
        const handleDelete = () => dispatch(itemsSlice.actions.delete(item));
        const handleEdit   = () => dispatch(getModalToggle(item));

        return (
            <tr key={ `${item.slug}-${item.weight}-${index}` }>
                <td>{ item.name }</td>
                <td>
                    { item.weight }
                    %
                </td>
                <td>
                    <div className="buttons">
                        <ActionButton onClick={ handleEdit }>
                            <EditIcon />
                        </ActionButton>
                        <ActionButton onClick={ handleDelete }>
                            <TrashIcon />
                        </ActionButton>
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <table className="table is-fullwidth is-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Weight</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { itemComponents }
            </tbody>
        </table>
    );
}

export default TableDisplay;
