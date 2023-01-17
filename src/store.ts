import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';

const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
        weightedTable: {
            items: [
                { name: 'Apple', slug: 'apple', weight: 5 },
                { name: 'Banana', slug: 'banana', weight: 5 },
                { name: 'Grape', slug: 'grape', weight: 10 },
                { name: 'Lemon', slug: 'lemon', weight: 15 },
                { name: 'Orange', slug: 'orange', weight: 30 },
                { name: 'Peach', slug: 'peach', weight: 15 },
                { name: 'Plum', slug: 'plum', weight: 10 },
                { name: 'Strawberry', slug: 'strawberry', weight: 5 },
                { name: 'Watermelon', slug: 'watermelon', weight: 5 },
            ],
        },
    },
});

export type StoreState = ReturnType<typeof store.getState>;

export default store;
