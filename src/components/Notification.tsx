import React   from 'react';
import isEmpty from 'lodash/isEmpty';

interface Props {
    className: string;
    content: string;
    handleDelete: () => void;
    isActive: boolean;
}

function Notification({
    className, content, isActive, handleDelete,
}: Props) {
    const classes = [
        'notification',
        className,
    ];

    if (isActive) {
        classes.push('is-active');
        setTimeout(handleDelete, 3500);
    }

    if (!isEmpty(className)) {
        classes.push(className);
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
            { content }
        </div>
    );
}

export default Notification;
