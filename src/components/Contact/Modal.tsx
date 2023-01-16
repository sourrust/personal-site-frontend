import React from 'react';

import ContactState          from '../../types/ContactState';
import MessageCounter        from './MessageCounter';
import ModalStyle            from '../ModalStyle';
import Notification          from '../../types/Notification';
import NotificationComponent from '../Notification';
import isValidEmail          from '../../utility/isValidEmail';
import isValidMessage        from './isValidMessage';

interface Props {
    handleClose: () => void;
    handleInput: React.ChangeEventHandler;
    handleNotificationDelete: React.MouseEventHandler<HTMLButtonElement>;
    handleSubmit: React.FormEventHandler;
    hasError: boolean;
    isActive: boolean;
    notification: Notification;
    textData: ContactState;
}

function Modal({
    isActive,
    notification,
    hasError,
    textData,
    handleClose,
    handleInput,
    handleSubmit,
    handleNotificationDelete,
}: Props) {
    const classes = ['modal'];

    const isInvalidEmail   = !isValidEmail(textData.email);
    const isInvalidMessage = !isValidMessage(textData.message);

    const isInvalidData = hasError && (isInvalidEmail || isInvalidMessage);

    const classNameEmail = hasError && isInvalidEmail
        ? 'input is-danger'
        : 'input';

    const classNameMessage = hasError && isInvalidMessage
        ? 'textarea is-danger'
        : 'textarea';

    if (isActive) {
        classes.push('is-active');
    }

    return (
        <div className={ classes.join(' ') }>
            <ModalStyle isActive={ isActive } />
            <NotificationComponent
                notification={ notification }
                handleDelete={ handleNotificationDelete }
            />
            <div className="modal-background" role="presentation" onClick={ handleClose } />
            <div className="modal-content">
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Contact</p>
                        <button
                            type="button"
                            className="delete"
                            onClick={ handleClose }
                            aria-label="close"
                        />
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
                                            onChange={ handleInput }
                                        />
                                    </div>
                                    <div className="field">
                                        <input
                                            className={ classNameEmail }
                                            name="email"
                                            type="text"
                                            placeholder="Email"
                                            value={ textData.email }
                                            onChange={ handleInput }
                                        />
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
                                    onChange={ handleInput }
                                />
                            </div>
                            <div className="field textarea-container">
                                <textarea
                                    className={ classNameMessage }
                                    name="message"
                                    placeholder="Message"
                                    value={ textData.message }
                                    onChange={ handleInput }
                                />
                                <MessageCounter message={ textData.message } />
                            </div>
                            <div className="field">
                                <button
                                    type="submit"
                                    className="button is-black"
                                    disabled={ isInvalidData }
                                >
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

export default Modal;
