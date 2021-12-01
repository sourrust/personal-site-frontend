import React from 'react';
import map   from 'lodash/map';

import Card      from './Card';
import Highlight from '../../types/Highlight';
import useTabs   from './useTabs';

interface Props {
    highlights: Highlight[];
}

function Cards({ highlights }: Props) {
    const tabValues = map(highlights, (highlight) => ({ ...highlight, isActive: false }));

    const [tabs, handleClick] = useTabs(tabValues);

    const cards = map(tabs, (tab) => (
        <Card key={ tab.slug } tab={ tab } onClick={ handleClick(tab) } />
    ));

    return (
        <div id="about-cards">
            { cards }
        </div>
    );
}

export default Cards;
