import React   from 'react';
import Link    from './Link';
import Twitter from '../icons/Twitter';

function TwitterLink({ className }) {
    return (
        <Link
            className={ className }
            href="https://twitter.com/critabstraction"
            IconComponent={ Twitter } />
    );
}

export default TwitterLink;
