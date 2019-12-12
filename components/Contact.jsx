import React   from 'react';
import extend  from 'lodash/extend';
import isEmpty from 'lodash/isEmpty';

import Email        from './icons/Email';
import Notification from './Notification';

import { isValidEmail, trackerEvent } from '../utility';

function isValidMessage(message) {
    return !isEmpty(message);
}

function ModalStyle({ isActive }) {
    if (!isActive) {
        return null;
    }

    return (
        <style jsx global>{'html { overflow-y: hidden }'}</style>
    );
}

function MessageCounter({ message }) {
    const className = isEmpty(message)
        ? 'textarea-counter'
        : 'textarea-counter is-active';

    return (
        <span className={ className }>
          { message.length }
        </span>
    );
}

function ContactModal({
    isActive, notification, hasError, textData, handleClose,
    handleInput, handleSubmit, handleNotificationDelete
}) {
    const className = isActive ? ' is-active' : '';

    const isInvalidEmail   = !isValidEmail(textData.email);
    const isInvalidMessage = !isValidMessage(textData.message);

    const isInvalidData = hasError && (isInvalidEmail || isInvalidMessage);

    const classNameEmail = hasError && isInvalidEmail
        ? 'input is-danger'
        : 'input';

    const classNameMessage = hasError && isInvalidMessage
        ? 'textarea is-danger'
        : 'textarea';

    return (
        <div className={ `modal${className}` }>
            <ModalStyle isActive={ isActive } />
            <Notification
                className={ hasError ? 'is-danger' : null }
                content={ notification.content }
                isActive={ notification.visible }
                handleDelete={ handleNotificationDelete } />
            <div className="modal-background" onClick={ handleClose } />
            <div className="modal-content">
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Contact</p>
                        <button
                            className="delete"
                            onClick={ handleClose }
                            aria-label="close" />
                    </header>
                    <section className="modal-card-body">
                        <form onSubmit={ handleSubmit }>
                            <div className="field is-horizontal">
                                <div className="field-body">
                                    <div className="field">
                                        <input
                                            className="input"
                                            name="name"
                                            type="text"
                                            placeholder="Name"
                                            value={ textData.name }
                                            onChange={ handleInput } />
                                    </div>
                                    <div className="field">
                                        <input
                                            className={ classNameEmail }
                                            name="email"
                                            type="text"
                                            placeholder="Email"
                                            value={ textData.email }
                                            onChange={ handleInput } />
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <input
                                    className="input"
                                    name="subject"
                                    type="text"
                                    placeholder="Subject"
                                    value={ textData.subject }
                                    onChange={ handleInput } />
                            </div>
                            <div className="field textarea-container">
                                <textarea
                                    className={ classNameMessage }
                                    name="message"
                                    placeholder="Message"
                                    value={ textData.message }
                                    onChange={ handleInput } />
                                <MessageCounter message={ textData.message } />
                            </div>
                            <div className="field">
                                <button
                                    type="submit"
                                    className="button is-black"
                                    disabled={ isInvalidData }>
                                    Send
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}

function useInput() {
    const [input, setInput] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    function handleInput(event) {
        const { name, value } = event.currentTarget;

        const newInput = extend({}, input, { [name]: value });

        setInput(newInput);
    }

    function clearInput() {
        setInput({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    }

    return [input, handleInput, clearInput];
}

function useModal(setHasError) {
    const [isActive, setIsActive] = React.useState(false);

    function handleToggle() {
        trackerEvent('view_email_form', 'contact');

        setIsActive(!isActive);
        setHasError(false);
    }

    function handleHide() {
        setIsActive(false);
    }

    return [isActive, handleToggle, handleHide];
}

function useNotification() {
    const [notification, setNotification] = React.useState({
        visible: false,
        content: ''
    });

    function handleShow(content) {
        const visible      = true;
        const notification = { content, visible };

        setNotification(notification);
    }

    function handleDelete() {
        const newNotification = extend({}, notification, { visible: false});

        setNotification(newNotification);
    }

    return [notification, handleShow, handleDelete];
}

function generateErrorMessage(errorFields) {
    if (errorFields.length > 1) {
        return `The fields ${errorFields.join(' and ')} are required or invalid`;
    }

    const field = errorFields[0];

    if (field === 'email' && !isEmpty(field)) {
        return `The ${field} field is invalid`;
    }

    return `The ${field} field is required`
}

function Contact() {
    const [hasError, setHasError] = React.useState(false);

    const [notification, handleShow, handleDelete] = useNotification();
    const [input, handleInput, clearInput]         = useInput();
    const [isActive, handleToggle, handleHide]     = useModal(setHasError);

    async function handleSubmitContact(event) {
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

        const content = await fetch('/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        })
        .then(response => response.json());

        clearInput();
        setHasError(false);

        handleShow('Message was sent!');

        setTimeout(handleHide, 4000);
    }

    return (
        <section id="contact" className="section">
            <h2 className="title">
                Contact
            </h2>
            <h4 className="subtitle">
                Have something you want to talk to me about? Feel free to react out via
            </h4>
            <button
                type="button"
                className="button is-medium is-black"
                onClick={ handleToggle }>
                <span className="icon">
                    <Email />
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
                handleSubmit={ handleSubmitContact } />
        </section>
    );
}

export default Contact;
