import React from 'react';

import trackerEvent from '../../utility/trackerEvent';

function useModal(setHasError: (hasError: boolean) => void) {
    const [isActive, setIsActive] = React.useState(false);

    function handleToggle() {
        trackerEvent('view_email_form', 'contact');

        setIsActive(!isActive);
        setHasError(false);
    }

    function handleHide() {
        setIsActive(false);
    }

    return [isActive, handleToggle, handleHide] as [
        boolean,
        () => void,
        () => void
    ];
}

export default useModal;
