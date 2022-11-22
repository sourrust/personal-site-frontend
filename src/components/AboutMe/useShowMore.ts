import React from 'react';

import trackerEvent from '../../utility/trackerEvent';

function useShowMore(initialShowMore: boolean): [boolean, () => void] {
    const [showMore, setShowMore] = React.useState(initialShowMore);

    function handleClick() {
        trackerEvent('view_about_me', 'engagement');

        setShowMore(!showMore);
    }

    return [showMore, handleClick];
}

export default useShowMore;
