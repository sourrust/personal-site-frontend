import React   from 'react';
import isEmpty from 'lodash/isEmpty';

interface Props {
    message: string;
}

function MessageCounter({ message }: Props) {
    const classes = ['textarea-counter'];

    if (!isEmpty(message)) {
        classes.push('is-active');
    }

    return (
        <span className={ classes.join(' ') }>
            { message.length }
        </span>
    );
}

export default MessageCounter;
