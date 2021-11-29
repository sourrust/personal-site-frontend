import every   from 'lodash/every';
import isEmpty from 'lodash/isEmpty';

function isValidLocal(local) {
    const textEncoder = new TextEncoder();

    return !(isEmpty(local) || textEncoder.encode(local).length > 64);
}

function isValidDomainPart(value) {
    return !(isEmpty(value) || value.length > 63)
}

function isValidDomain(domain) {
    const parts = domain.split('.');

    if (parts.length < 2) {
        return false;
    }

    return every(parts, isValidDomainPart);
}

function isValidEmail(emailStr) {
    if (isEmpty(emailStr) || emailStr.length > 254) {
        return false;
    }

    const email = emailStr.normalize('NFC');
    const parts = email.split('@');

    if (parts.length !== 2) {
        return false;
    }

    const [local, domain] = parts;

    return isValidLocal(local) && isValidDomain(domain);
}

export default isValidEmail;
