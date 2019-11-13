import React   from 'react';
import compact from 'lodash/compact';

function Notification({
    className, content, isActive, handleDelete
}) {
    const classes = [
        'notification',
        isActive ? 'is-active' : null,
        className
    ];

    const classNameString = compact(classes).join(' ');

    if (isActive) {
        setTimeout(handleDelete, 3500);
    }

    return (
        <div className={ classNameString }>
            <button
                type="button"
                onClick={ handleDelete }
                className="delete" />
            { content }
        </div>
    );
}

export default Notification;
