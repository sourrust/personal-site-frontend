import React   from 'react';
import isEmpty from 'lodash/isEmpty';

import { FaLink as LinkIcon } from 'react-icons/fa';

interface Props {
    url?: string;
}

function LinkIconComponent({ url }: Props) {
    if (isEmpty(url)) {
        return null;
    }

    return (
        <React.Fragment>
            {' '}
            <a
                className="button is-white"
                target="_blank"
                rel="noopener noreferrer"
                title="Website"
                href={ url }
            >
                <LinkIcon className="react-icon" />
            </a>
        </React.Fragment>
    );
}

LinkIconComponent.defaultProps = {
    url: '',
};

export default LinkIconComponent;
