import React from 'react';

import { FaGithub as Github } from 'react-icons/fa';

import Link from './Link';

function GithubLink({ className }) {
    return (
        <Link
            className={ className }
            href="https://github.com/sourrust"
            IconComponent={ Github } />
    );
}

export default GithubLink;
