import extend     from 'lodash/extend';
import htmlParser from 'html-react-parser';
import marked     from 'marked';

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
    const html = marked(content);

    return htmlParser(html, { replace: handleAnchorTagReplace });
}

export default markdownToReact;
