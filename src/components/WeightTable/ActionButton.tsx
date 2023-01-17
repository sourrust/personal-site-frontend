import React from 'react';

interface Props {
    children: JSX.Element | JSX.Element[] | string;
    onClick: React.MouseEventHandler;
}

function ActionButton({ children, onClick }: Props) {
    return (
        <button className="button is-small" type="button" onClick={ onClick }>
            { children }
        </button>
    );
}

export default ActionButton;
