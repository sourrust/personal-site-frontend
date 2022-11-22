import React from 'react';

import Notification from '../../types/Notification';

function useNotification(): [Notification, (content: string) => void, () => void] {
    const [notification, setNotification] = React.useState<Notification>({
        visible: false,
        content: '',
    });

    function handleShow(content: string) {
        const visible = true;

        setNotification({ content, visible });
    }

    function handleDelete() {
        const newNotification = { ...notification, visible: false };

        setNotification(newNotification);
    }

    return [notification, handleShow, handleDelete];
}

export default useNotification;
