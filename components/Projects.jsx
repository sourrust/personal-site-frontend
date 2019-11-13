import React   from 'react';
import map     from 'lodash/map';
import Project from './Project';

const projects = [
    {
        name: 'flac',
        key: 'flac',
        github: 'sourrust/flac',
        href: 'https://github.com/sourrust/flac',
        image: {
            baseUrl: 'flac',
            title: 'FLAC'
        },
        description: 'A rust implementation of the audio format FLAC, ' +
                     'free lossless audio codec.',
        tags: ['rust', 'audio', 'decoder']
    },
    {
        name: 'highlight.js',
        key: 'highlight.js',
        github: 'highlightjs/highlight.js',
        href: 'https://github.com/highlightjs/highlight.js',
        image: {
            baseUrl: 'highlight-js',
            title: 'Highlight JS'
        },
        description: 'Javascript syntax highlighter',
        tags: ['javascript', 'syntax highlighter']
    },
    {
        name: 'laco',
        key: 'laco',
        github: 'sourust/laco',
        href: 'https://github.com/sourrust/laco',
        image: {
            baseUrl: 'laco',
            title: 'Laco'
        },
        description: 'An improved REPL for Lua',
        tags: ['c', 'repl']
    }
];

function Projects() {
    const projectComponents = map(projects, project => <Project { ...project } />);

    return (
        <section id="projects" className="section">
            <div className="columns">
                { projectComponents }
            </div>
        </section>
    );
}

export default Projects;
