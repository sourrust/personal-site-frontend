import React from 'react';

import Navigation from './Navigation';

interface Props {
    children: JSX.Element | JSX.Element[] | string;
}

function NavigationHero({ children }: Props) {
    return (
        <section className="summary hero is-fullheight">
            <div className="hero-header">
                <Navigation />
            </div>
            <div className="hero-body">
                { children }
            </div>
        </section>
    );
}

export default NavigationHero;
