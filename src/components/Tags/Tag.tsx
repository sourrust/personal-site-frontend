import React from 'react';

interface Props {
    tag: string;
}

function Tag({ tag }: Props) {
    return (
        <span className="tag is-dark is-medium">{ tag }</span>
    );
}

export default Tag;
