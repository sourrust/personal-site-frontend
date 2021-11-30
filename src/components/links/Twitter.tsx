import React from 'react';

import { FaTwitter as Twitter } from 'react-icons/fa';

import Link from './Link';

interface Props {
    className: string;
}

function TwitterLink({ className }: Props) {
    return (
        <Link
            className={ className }
            href="https://twitter.com/critabstraction"
            IconComponent={ Twitter }
        />
    );
}

export default TwitterLink;
