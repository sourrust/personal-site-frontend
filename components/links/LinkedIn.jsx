import React    from 'react';

import { FaLinkedin as LinkedIn } from 'react-icons/fa';

import Link from './Link';

function LinkedInLink({ className }) {
    return (
        <Link
            className={ className }
            href="https://www.linkedin.com/in/jeremy-hull-355481107"
            IconComponent={ LinkedIn } />
    );
}

export default LinkedInLink;
