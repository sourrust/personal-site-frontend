import isEmpty from 'lodash/isEmpty';

function isValidEmail(email) {
    return !isEmpty(email)
}

export default isValidEmail;
