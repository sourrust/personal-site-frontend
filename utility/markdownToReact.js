import extend     from 'lodash/extend';
import htmlParser from 'html-react-parser';

function isAnchorTag(node) {
    return node.type === 'tag' && node.name === 'a';
}

function handleAnchorTagReplace(node) {
    if (!isAnchorTag(node)) {
        return node;
    }

    node.attribs = extend({}, node.attribs, {
        rel: 'noopener noreferrer',
        target: '_blank'
    });

    return node;
}

function markdownToReact(content) {
    return htmlParser(content, { replace: handleAnchorTagReplace });
}

export default markdownToReact;
