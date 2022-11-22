import React from 'react';

import ContactState from '../../types/ContactState';

function useInput(): [ContactState, React.ChangeEventHandler, () => void] {
    const [input, setInput] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.currentTarget;

        const newInput = { ...input, [name]: value };

        setInput(newInput);
    }

    function clearInput() {
        setInput({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
    }

    return [input, handleInput, clearInput];
}

export default useInput;
