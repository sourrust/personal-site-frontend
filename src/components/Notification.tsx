import React from 'react';
import isNil from 'lodash/isNil';

import INotification from '../types/Notification';

interface Props {
    notification: INotification;
    handleDelete: React.MouseEventHandler<HTMLButtonElement>;
}

function Notification({ notification, handleDelete }: Props) {
    const classes = ['notification'];

    if (notification.visible) {
        classes.push('is-active');
        setTimeout(handleDelete, 3500);
    }

    if (!isNil(notification.variant)) {
        classes.push(notification.variant);
    }

    const classNameString = classes.join(' ');

    return (
        <div className={ classNameString }>
            <button
                type="button"
                aria-label="delete"
                onClick={ handleDelete }
                className="delete"
            />
            { notification.content }
        </div>
    );
}

export default Notification;
