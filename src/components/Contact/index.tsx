import React   from 'react';
import isEmpty from 'lodash/isEmpty';

import { FaRegEnvelope as Email } from 'react-icons/fa';

import isValidEmail    from '../../utility/isValidEmail';
import isValidMessage  from './isValidMessage';
import useInput        from './useInput';
import useModal        from './useModal';
import useNotification from './useNotification';
import ContactModal    from './Modal';

function generateErrorMessage(errorFields: string[]) {
    if (errorFields.length > 1) {
        return `The fields ${errorFields.join(' and ')} are required or invalid`;
    }

    const field = errorFields[0];

    if (field === 'email' && !isEmpty(field)) {
        return `The ${field} field is invalid`;
    }

    return `The ${field} field is required`;
}

function Contact() {
    const [hasError, setHasError] = React.useState(false);

    const [notification, handleShow, handleDelete] = useNotification();
    const [input, handleInput, clearInput]         = useInput();
    const [isActive, handleToggle, handleHide]     = useModal(setHasError);

    const handleSubmitContact = React.useCallback(async (event: React.FormEvent) => {
        event.preventDefault();

        const isInvalidEmail   = !isValidEmail(input.email);
        const isInvalidMessage = !isValidMessage(input.message);
        const errorFields      = [];

        if (isInvalidEmail) {
            errorFields.push('email');
        }

        if (isInvalidMessage) {
            errorFields.push('message');
        }

        if (isInvalidEmail || isInvalidMessage) {
            setHasError(true);
            handleShow(
                generateErrorMessage(errorFields)
            );

            return;
        }

        await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        })
            .then((response) => response.json());

        clearInput();
        setHasError(false);

        handleShow('Message was sent!');

        setTimeout(handleHide, 4000);
    }, [input]);

    return (
        <section id="contact" className="section">
            <h2 className="title">
                Contact
            </h2>
            <h4 className="subtitle">
                Have something you want to talk to me about? A job
                opportunity? A new project? Feel free to react out via
            </h4>
            <button
                type="button"
                className="button is-medium is-black"
                onClick={ handleToggle }
            >
                <span className="icon">
                    <Email className="react-icon" />
                </span>
                <span>Email</span>
            </button>
            <ContactModal
                isActive={ isActive }
                notification={ notification }
                hasError={ hasError }
                textData={ input }
                handleClose={ handleToggle }
                handleInput={ handleInput }
                handleNotificationDelete={ handleDelete }
                handleSubmit={ handleSubmitContact }
            />
        </section>
    );
}

export default Contact;
