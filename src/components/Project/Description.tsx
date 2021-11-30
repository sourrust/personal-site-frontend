import isNil from 'lodash/isNil';

import htmlToReact from '../../utility/htmlToReact';

interface Props {
    description?: string;
}

function Description({ description }: Props) {
    if (isNil(description)) {
        return null;
    }

    return htmlToReact(description) as JSX.Element;
}

Description.defaultProps = {
    description: '',
};

export default Description;
