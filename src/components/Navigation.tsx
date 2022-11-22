import React from 'react';
import Link  from 'next/link';

import { useRouter } from 'next/router';

import Github   from './links/Github';
import LinkedIn from './links/LinkedIn';
import Twitter  from './links/Twitter';

function useActive(defaultIsActive: boolean): [boolean, () => void] {
    const [isActive, setIsActive] = React.useState(defaultIsActive);

    function handleClick() {
        setIsActive(!isActive);
    }

    return [isActive, handleClick];
}

function getClasses(isActive: boolean, classString: string) {
    if (isActive) {
        return `${classString} is-active`;
    }

    return classString;
}

function Navigation() {
    const [isActive, handleClick] = useActive(false);

    const path = useRouter().asPath;

    const burgerClasses = getClasses(isActive, 'navbar-burger');
    const menuClasses   = getClasses(isActive, 'navbar-menu');

    return (
        <nav className="navbar" aria-label="main navigation">
            <div className="navbar-brand">
                <button
                    type="button"
                    className={ burgerClasses }
                    aria-label="menu"
                    aria-expanded="false"
                    tabIndex={ 0 }
                    onClick={ handleClick }
                >
                    <span aria-hidden />
                    <span aria-hidden />
                    <span aria-hidden />
                </button>
            </div>
            <div className={ menuClasses }>
                <div className="navbar-start">
                    <Link href="/" passHref>
                        <a href="/" className="navbar-item">
                            Home
                        </a>
                    </Link>
                    <Link href="/projects" passHref>
                        <a href="/" className="navbar-item">
                            Projects
                        </a>
                    </Link>
                    <Link href={ `${path}#contact` } passHref>
                        <a href="/" className="navbar-item">
                            Contact
                        </a>
                    </Link>
                    <Link href={ `${path}#resume` } passHref>
                        <a href="/" className="navbar-item">
                            Resume
                        </a>
                    </Link>
                </div>
                <div className="navbar-end">
                    <div className="social-links">
                        <Github className="navbar-item" />
                        <LinkedIn className="navbar-item" />
                        <Twitter className="navbar-item" />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
