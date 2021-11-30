import React from 'react';

import { FaAngleDown as AngleDown } from 'react-icons/fa';

import Tab from '../../types/Tab';

interface Props {
    onClick: React.MouseEventHandler;
    tab: Tab;
}

function Card({ onClick, tab }: Props) {
    const url     = `#${tab.slug}`;
    const classes = ['card'];

    if (tab.isActive) {
        classes.push('is-active');
    }

    return (
        <div id={ tab.slug } className={ classes.join(' ') }>
            <header className="card-header">
                <p className="card-header-title" role="presentation" onClick={ onClick }>
                    { tab.name }
                </p>
                <a
                    className="card-header-icon"
                    onClick={ onClick }
                    href={ url }
                >
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

export default Card;
