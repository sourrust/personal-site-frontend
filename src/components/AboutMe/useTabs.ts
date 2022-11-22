import React from 'react';
import map   from 'lodash/map';

import Tab          from '../../types/Tab';
import trackerEvent from '../../utility/trackerEvent';

type ClickHandler = (tab: Tab) => (event: React.MouseEvent) => void;

function useTabs(initialTabs: Tab[]): [Tab[], ClickHandler] {
    const [tabs, setTabs] = React.useState(initialTabs);

    function handleClick(tab: Tab) {
        return (event: React.MouseEvent) => {
            event.preventDefault();

            const label   = tab.slug.replace('-', '_');
            const newTabs = map(tabs, (oldTab) => {
                if (oldTab.slug === tab.slug) {
                    return { ...oldTab, isActive: !oldTab.isActive };
                }

                return oldTab;
            });

            if (tab.isActive) {
                trackerEvent(`view_${label}_card`, 'engagement');
            }

            setTabs(newTabs);
        };
    }

    return [tabs, handleClick];
}

export default useTabs;
