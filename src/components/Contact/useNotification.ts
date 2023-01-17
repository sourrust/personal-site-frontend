import React from 'react';

import Notification     from '../../types/Notification';
import NotificationType from '../../types/NotificationType';

function useNotification(): [Notification, (content: string, variant?: NotificationType) => void, () => void] {
    const [notification, setNotification] = React.useState<Notification>({
        visible: false,
        content: '',
    });

    function handleShow(content: string, variant?: NotificationType) {
        const visible = true;

        setNotification({ content, variant, visible });
    }

    function handleDelete() {
        const newNotification = { ...notification, visible: false };

        setNotification(newNotification);
    }

    return [notification, handleShow, handleDelete];
}

export default useNotification;
