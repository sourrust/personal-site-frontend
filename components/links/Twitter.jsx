import React from 'react';

import { FaTwitter as Twitter } from 'react-icons/fa';

import Link from './Link';

function TwitterLink({ className }) {
    return (
        <Link
            className={ className }
            href="https://twitter.com/critabstraction"
            IconComponent={ Twitter } />
    );
}

export default TwitterLink;
