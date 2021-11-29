import extend from 'lodash/extend';

import htmlParser, { DOMNode, Element } from 'html-react-parser';

function isAnchorTag(node: DOMNode): node is Element {
    return node instanceof Element && node.type === 'tag' && node.name === 'a';
}

function handleAnchorTagReplace(node: DOMNode) {
    if (!isAnchorTag(node)) {
        return node;
    }

    // eslint-disable-next-line no-param-reassign
    node.attribs = extend({}, node.attribs, {
        rel: 'noopener noreferrer',
        target: '_blank',
    });

    return node;
}

function htmlToReact(content: string) {
    return htmlParser(content, { replace: handleAnchorTagReplace });
}

export default htmlToReact;
