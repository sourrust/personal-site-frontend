import NotificationType from './NotificationType';

interface Notification {
    content: string;
    visible: boolean;
    variant?: NotificationType;
}

export default Notification;
