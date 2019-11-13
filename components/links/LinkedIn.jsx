import React    from 'react';
import Link     from './Link';
import LinkedIn from '../icons/LinkedIn';

function LinkedInLink({ className }) {
    return (
        <Link
            className={ className }
            href="https://www.linkedin.com/in/jeremy-hull-355481107"
            IconComponent={ LinkedIn } />
    );
}

export default LinkedInLink;
