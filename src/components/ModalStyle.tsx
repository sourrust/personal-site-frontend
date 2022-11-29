import React from 'react';

interface Props {
    isActive: boolean;
}

function ModalStyle({ isActive }: Props) {
    if (!isActive) {
        return null;
    }

    return (
        <style jsx global>{'html { overflow-y: hidden }'}</style>
    );
}

export default ModalStyle;
