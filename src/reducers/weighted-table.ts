import { combineReducers } from 'redux';

import items from '../slices/weighted-table/items';
import modal from '../slices/weighted-table/modal';

const reducer = combineReducers({
    items: items.reducer,
    modal: modal.reducer,
});

export default reducer;
