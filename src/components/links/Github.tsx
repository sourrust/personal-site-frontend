import React from 'react';

import { FaGithub as Github } from 'react-icons/fa';

import Link from './Link';

interface Props {
    className: string;
}

function GithubLink({ className }: Props) {
    return (
        <Link
            className={ className }
            href="https://github.com/sourrust"
            IconComponent={ Github }
        />
    );
}

export default GithubLink;
