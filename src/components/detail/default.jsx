import React from 'react';
import map   from 'lodash/map';

function useIndex(defaultIndex) {
    const [index, setIndex] = React.useState(defaultIndex);

    const items = [
        'Software Engineer',
        'Open Source Advocate',
        'Game Mechanics Spelunker',
        'Systems Design Nerd',
        'Recreational Critic'
    ];

    function itemHandler() {
        const newIndex  = index + 1;
        const nextIndex = newIndex >= items.length ? 0 : newIndex;

        setIndex(nextIndex);
    }

    return [index, items, itemHandler];
}

function DetailItem({ item, isActive }) {
    const classes = ['subtitle-list-item'];

    if (isActive) {
        classes.push('is-active');
    }

    return (
        <li className={ classes.join(' ') }>{ item }</li>
    );
}

function DetailItems({ items, itemIndex }) {
    const detailItems = map(items, (item, index) => (
        <DetailItem
            key={ item }
            isActive={ itemIndex === index }
            item={ item } />
    ));

    return (
        <ul className="subtitle-list">
            { detailItems }
        </ul>
    );
}

function DefaultDetail() {
    const [index, items, itemHandler] = useIndex(0);

    React.useEffect(() => {
        const itemUpdateId = setInterval(itemHandler, 3500);

        return () => clearInterval(itemUpdateId);
    });

    return (
        <div className="container has-text-centered">
            <h1 className="title">Hey, I'm Jeremy.</h1>
            <h2 className="subtitle">
                <DetailItems items={ items } itemIndex={ index } />
            </h2>
        </div>
    );
}

export default DefaultDetail;
