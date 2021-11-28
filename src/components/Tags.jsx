import React     from 'react';
import kebabCase from 'lodash/kebabCase';
import map       from 'lodash/map';

function Tag({ tag }) {
    return (
        <span className="tag is-dark is-medium">{ tag }</span>
    );
}

function Tags({ tags }) {
    const tagComponents = map(tags, tag =>
        <Tag key={ kebabCase(tag) } tag={ tag } />);

    return (
        <div className="tags">
            { tagComponents }
        </div>
    );
}

export default Tags;
