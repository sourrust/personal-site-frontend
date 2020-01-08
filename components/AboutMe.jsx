import React  from 'react';
import extend from 'lodash/extend';
import map    from 'lodash/map';

import AngleDown    from './icons/AngleDown';
import trackerEvent from '../utility/trackerEvent';

function useShowMore(initialShowMore) {
    const [showMore, setShowMore] = React.useState(initialShowMore);

    function handleClick() {
        trackerEvent('view_about_me', 'engagement');

        setShowMore(!showMore);
    }

    return [showMore, handleClick];
}

function useTabs(highlights) {
    const [tabs, setTabs] = React.useState(highlights);

    function handleClick(tab) {
        return (event) => {
            event.preventDefault();

            const label   = tab.slug.replace('-', '_');
            const newTabs = map(tabs, (oldTab) => {
                if (oldTab.slug === tab.slug) {
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
    const url     = `#${tab.slug}`;
    const classes = ['card'];

    if (tab.isActive) {
        classes.push('is-active');
    }

    return (
        <div id={ tab.slug } className={ classes.join(' ') }>
            <header className="card-header">
                <p className="card-header-title" onClick={ onClick }>
                    { tab.name }
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
                <div className="content">{ tab.description }</div>
            </div>
        </div>
    );
}

function Cards({ highlights }) {
    const tabValues = map(highlights, highlight =>
        extend({}, highlight, { isActive: false }));

    const [tabs, handleClick] = useTabs(tabValues);

    const cards = map(tabs, tab =>
        <Card key={ tab.slug } tab={ tab } onClick={ handleClick(tab) } />);

    return (
        <div id="about-cards">
            { cards }
        </div>
    );
}

function AboutMe({ highlights }) {
    const [showMore, handleClick] = useShowMore(false);

    let buttonContent  = 'Show Less';
    const contentClass = ['content'];

    if (!showMore) {
        contentClass.push('show-less');
        buttonContent = 'Show More';
    }

    return (
        <section id="about-me" className="section">
            <article className={ contentClass.join(' ') }>
                <p>
                    I'm Jeremy Hull, a software engineer raised in the open
                    source community. I love to build systems that solve
                    interesting problems and services that make use of
                    complex data sets, served in consumable pieces that are
                    easier to reason about.
                </p>
                <p>
                    As a child who grew up around computers and spent a good
                    amount of my time playing videos game. The merge between
                    an engaging narrative and mechanical mastery lead me
                    down the path of investigating how these types of
                    experiences are created. Eventually, it leads me to
                    pursue software development, in several of its different
                    fields, and not just video games. However, my real
                    passion is video games and participating in a community
                    that is important to me.
                </p>
                <p>
                    So what are these words I used at the top of the site?
                    Some of the titles are more comical in nature, but in
                    the section below I'm going to expand on them a bit.
                </p>
                <Cards highlights={ highlights } />
            </article>
            <button className="button is-fullwidth" onClick={ handleClick }>
                { buttonContent }
            </button>
        </section>
    );
}

export default AboutMe;
