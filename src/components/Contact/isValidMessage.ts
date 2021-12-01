import isEmpty from 'lodash/isEmpty';

function isValidMessage(message: string) {
    return !isEmpty(message);
}

export default isValidMessage;
