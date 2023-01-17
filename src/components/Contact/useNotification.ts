import React from 'react';

import Notification     from '../../types/Notification';
import NotificationType from '../../types/NotificationType';

type ShowNotificationHandler =
    (content: string, variant?: NotificationType) => void;

function useNotification(): [Notification, ShowNotificationHandler, () => void] {
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
