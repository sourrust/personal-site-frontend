import React from 'react';
import map   from 'lodash/map';

import AngleDown    from './icons/AngleDown';
import trackerEvent from '../utility/trackerEvent';

const TABS = [
    {
        label: 'Software Engineer',
        key: 'software-engineer',
        content:
            'There are several words to label a people that works on ' +
            'software: coder, programmer, developer, engineer, etc. ' +
            'However, for me, I think software engineer is the best to ' +
            'describe the way I approach my work and projects. Using ' +
            '"engineer" facilitates both the construction and design of ' +
            'software for a specific purpose.',
        isActive: false
    },
    {
        label: 'Open Source Advocate',
        key: 'open-source',
        content:
            'At the heart of a majority of tech companies is a multitude ' +
            'of open source projects. With the contribution of free labor ' +
            'and my foundation of software engineering came from the open ' +
            'source community, I believe more people and company should ' +
            'contribute to these communities.',
        isActive: false
    },
    {
        label: 'Game Mechanics Spelunker',
        key: 'game-mechanics',
        content:
            'When people think about games, the core of how you interact ' +
            'with this medium is through it\'s game mechanics. That ' +
            'communication between the game designer and player is what ' +
            'interests me. Thinking about and exploring these mechanics ' +
            'help me examine what a game claims to be and what was ' +
            'attempted to accomplish these goals.',
        isActive: false
    },
    {
        label: 'Systems Design Nerd',
        key: 'systems-design',
        content:
            'Thinking about the higher level systems within a software ' +
            'project enables me to think about the purpose of each ' +
            'component and how it will contribute to the overall system. ' +
            'That abstract nature of this type of design allows for you ' +
            'to share with other without completely exposing your ' +
            'software secrets, making it an interesting read about other ' +
            'engineers solutions to the problems they ran into in their ' +
            'software development cycle.',
        isActive: false

    },
    {
        label: 'Recreational Critic',
        key: 'critic',
        content:
            'As someone that dedicates my mind to understand complex ' +
            'pieces of software and presented to less tech-minded people, ' +
            'I found an interesting hobby in analyzing entertainment and ' +
            'breaking down more complicated elements within a storyline. ' +
            'Whether it is more abstract concepts or more real world ' +
            'critiques of society, writing about the entertainment I watch ' +
            'feel like good practice for my professional. Lastly, it makes ' +
            'watching entertainment seem more justified in my mind.',
        isActive: false
    }
];

function useShowMore(initialShowMore) {
    const [showMore, setShowMore] = React.useState(initialShowMore);

    function handleClick() {
        trackerEvent('view_about_me', 'engagement');

        setShowMore(!showMore);
    }

    return [showMore, handleClick];
}

function useTabs() {
    const [tabs, setTabs] = React.useState(TABS);

    function handleClick(tab) {
        return (event) => {
            event.preventDefault();

            const label   = tab.key.replace('-', '_');
            const newTabs = map(tabs, (oldTab) => {
                if (oldTab.key === tab.key) {
                    oldTab.isActive = !oldTab.isActive;
                }

                return oldTab;
            });

            if (tab.isActive) {
                trackerEvent(`view_${label}_card`, 'engagement');
            }

            setTabs(newTabs);
        };
    }

    return [tabs, handleClick];
}

function Card({ onClick, tab }) {
    const url     = `#${tab.key}`;
    const classes = ['card'];

    if (tab.isActive) {
        classes.push('is-active');
    }

    return (
        <div id={ tab.key } className={ classes.join(' ') }>
            <header className="card-header">
                <p className="card-header-title" onClick={ onClick }>
                    { tab.label }
                </p>
                <a
                    className="card-header-icon"
                    onClick={ onClick }
                    href={ url }>
                    <span className="icon">
                        <AngleDown />
                    </span>
                </a>
            </header>
            <div className="card-content">
                <div className="content">{ tab.content }</div>
            </div>
        </div>
    );
}

function Cards() {
    const [tabs, handleClick] = useTabs();

    const cards = map(tabs, tab =>
        <Card key={ tab.key } tab={ tab } onClick={ handleClick(tab) } />);

    return (
        <div id="about-cards">
            { cards }
        </div>
    );
}

function AboutMe() {
    const [showMore, handleClick] = useShowMore(false);

    let buttonContent  = 'Show Less';
    const contentClass = ['content'];

    if (!showMore) {
        contentClass.push('show-less');
        buttonContent = 'Show More';
    }

    return (
        <section id="about-me" className="section">
            <div className={ contentClass.join(' ') }>
                <p>
                    I'm Jeremy Hull, a software engineer raised in the open
                    source community. I love to build systems that solve
                    interesting problems and services that make use of
                    complex data sets, served in consumable pieces that are
                    easier to reason about.
                </p>
                <p>
                    As a child who grew up around computer and spend a good
                    amount of my time playing videos game. The merge between
                    an engaging narrative and mechanical mastery lead me
                    down the path of investigating how these types of
                    experiences are created. Eventually it lead me to pursue
                    software development, in several of it's different
                    fields, and not just videos games. However, my real
                    passion is video games, and participating in a community
                    that is important to me.
                </p>
                <p>
                    So what are these words I used at the top of the site?
                    Some of the titles are more comical in nature, but in
                    the section below I'm going to expand on them a bit.
                </p>
                <Cards />
            </div>
            <button className="button is-fullwidth" onClick={ handleClick }>
                { buttonContent }
            </button>
        </section>
    );
}

export default AboutMe;
