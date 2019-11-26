import React from 'react';
import Svg   from './Svg';

function EllipsisH() {
    const path = (
        'M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 ' +
        '32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 ' +
        '72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 ' +
        '72-32.2 72-72-32.2-72-72-72z'
    );

    return (
        <Svg title="ellipsis-h" path={ path } viewBox="0 0 512 512" />
    );
}

export default EllipsisH;
