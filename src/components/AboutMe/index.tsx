import React from 'react';

import Cards       from './Cards';
import Highlight   from '../../types/Highlight';
import useShowMore from './useShowMore';

interface Props {
    highlights: Highlight[];
}

function AboutMe({ highlights }: Props) {
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
                    I
                    {'\''}
                    m Jeremy Hull, a software engineer raised in the open
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
                    the section below I
                    {'\''}
                    m going to expand on them a bit.
                </p>
                <Cards highlights={ highlights } />
            </article>
            <button type="button" className="button is-fullwidth" onClick={ handleClick }>
                { buttonContent }
            </button>
        </section>
    );
}

export default AboutMe;
