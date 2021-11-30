import React     from 'react';
import kebabCase from 'lodash/kebabCase';
import map       from 'lodash/map';

import Tag from './Tag';

interface Props {
    tags: string[];
}

function Tags({ tags }: Props) {
    const tagComponents = map(tags, (tag) => <Tag key={ kebabCase(tag) } tag={ tag } />);

    return (
        <div className="tags">
            { tagComponents }
        </div>
    );
}

export default Tags;
