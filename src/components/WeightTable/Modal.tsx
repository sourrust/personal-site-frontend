import React     from 'react';
import isEmpty   from 'lodash/isEmpty';
import kebabCase from 'lodash/kebabCase';
import sumBy     from 'lodash/sumBy';

import { PayloadAction }            from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

import ItemWeight from '../../types/ItemWeight';
import ModalState from '../../types/WeightedTableModal';
import ModalStyle from '../ModalStyle';
import ModalType  from '../../types/WeightedTableModalType';
import itemsSlice from '../../slices/weighted-table/items';
import modalSlice from '../../slices/weighted-table/modal';

import { StoreState } from '../../store';

interface Props {
    items: ItemWeight[];
}

function getModalState(state: StoreState) {
    return state.weightedTable.modal;
}

function useModal() {
    const dispatch   = useDispatch();
    const modalState = useSelector(getModalState);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.currentTarget;

        const action = modalSlice.actions.inputChange({ name, value });

        dispatch(action);
    }

    function handleClose() {
        dispatch(modalSlice.actions.toggle({
            name: '',
            weight: '',
            type: ModalType.Update,
        }));
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const slug = kebabCase(modalState.name);
        let weight = parseInt(modalState.weight, 10);

        let action = {} as PayloadAction<ItemWeight>;

        if (weight > 100) {
            weight = 100;
        }

        if (weight < 1) {
            weight = 1;
        }

        switch (modalState.type) {
            case ModalType.Update:
                action = itemsSlice.actions.edit({
                    name: modalState.name,
                    slug: slug,
                    weight: weight,
                });

                break;
            case ModalType.Create:
                action = itemsSlice.actions.add({
                    name: modalState.name,
                    slug: slug,
                    weight: weight,
                });

                break;
            default:
                break;
        }

        dispatch(action);
        handleClose();
    }

    return {
        modalState,
        handleChange,
        handleClose,
        handleSubmit,
    };
}

function getTitle(type: ModalType) {
    switch (type) {
        case ModalType.Update:
            return 'Edit Table Item';
        case ModalType.Create:
            return 'Add Table Item';
        default:
            return '';
    }
}

function Modal({ items }: Props) {
    const {
        modalState,
        handleChange,
        handleSubmit,
        handleClose,
    } = useModal();

    const classes     = ['modal'];
    const weightTotal = sumBy(items, 'weight');
    const title       = getTitle(modalState.type);

    if (modalState.isActive) {
        classes.push('is-active');
    }

    return (
        <div className={ classes.join(' ') }>
            <ModalStyle isActive={ modalState.isActive } />
            <div className="modal-background" role="presentation" onClick={ handleClose } />
            <div className="modal-content">
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{ title }</p>
                        <button
                            type="button"
                            className="delete"
                            onClick={ handleClose }
                            aria-label="close"
                        />
                    </header>
                    <section className="modal-card-body">
                        <form onSubmit={ handleSubmit }>
                            <div className="field is-horizontal">
                                <div className="field-body">
                                    <div className="field">
                                        <input
                                            className="input"
                                            name="name"
                                            type="text"
                                            placeholder="Name"
                                            value={ modalState.name }
                                            onChange={ handleChange }
                                        />
                                    </div>
                                    <div className="field">
                                        <input
                                            className="input"
                                            name="slug"
                                            type="text"
                                            placeholder="Slug"
                                            disabled
                                            value={ kebabCase(modalState.name) }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <input
                                    className="input"
                                    name="weight"
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="Weight"
                                    value={ modalState.weight }
                                    onChange={ handleChange }
                                />
                            </div>
                            <div className="field">
                                <button type="submit" className="button is-black">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Modal;
