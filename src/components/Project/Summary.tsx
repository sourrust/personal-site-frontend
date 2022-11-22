import React   from 'react';
import isEmpty from 'lodash/isEmpty';

interface Props {
    summary?: string;
}

function Summary({ summary }: Props) {
    if (isEmpty(summary)) {
        return null;
    }

    return (
        <blockquote className="summary">
            { summary }
        </blockquote>
    );
}

Summary.defaultProps = {
    summary: '',
};

export default Summary;
