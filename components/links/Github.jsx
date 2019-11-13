import React  from 'react';
import Github from '../icons/Github';
import Link   from './Link';

function GithubLink({ className }) {
    return (
        <Link
            className={ className }
            href="https://github.com/sourrust"
            IconComponent={ Github } />
    );
}

export default GithubLink;
