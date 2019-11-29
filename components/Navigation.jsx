import React    from 'react';
import Link     from 'next/link';
import Github   from './links/Github';
import LinkedIn from './links/LinkedIn';
import Twitter  from './links/Twitter';

function useActive(defaultIsActive) {
    const [isActive, setIsActive] = React.useState(defaultIsActive);

    function handleClick() {
        setIsActive(!isActive);
    }

    return [isActive, handleClick];
}

function getClasses(isActive, classString) {
    if (isActive) {
        return `${classString} is-active`;
    }

    return classString;
}

function Navigation() {
    const [isActive, handleClick] = useActive(false);

    const burgerClasses = getClasses(isActive, 'navbar-burger');
    const menuClasses   = getClasses(isActive, 'navbar-menu');

    return (
        <nav className="navbar" aria-label="main navigation">
            <div className="navbar-brand">
                <a
                    role="button"
                    className={ burgerClasses }
                    aria-label="menu"
                    aria-expanded="false"
                    tabIndex={ 0 }
                    onClick={ handleClick }>
                    <span aria-hidden />
                    <span aria-hidden />
                    <span aria-hidden />
                </a>
            </div>
            <div className={ menuClasses }>
                <div className="navbar-start">
                    <Link href="/">
                        <a className="navbar-item">
                            Home
                        </a>
                    </Link>
                    <Link href="/projects">
                        <a className="navbar-item">
                            Projects
                        </a>
                    </Link>
                    <Link href="#contact">
                        <a className="navbar-item">
                            Contact
                        </a>
                    </Link>
                    <Link href="#resume">
                        <a className="navbar-item">
                            Resume
                        </a>
                    </Link>
                </div>
                <div className="navbar-end">
                    <div className="is-hidden-touch">
                        <Github className="navbar-item" />
                        <LinkedIn className="navbar-item" />
                        <Twitter className="navbar-item" />
                    </div>
                    <div className="is-hidden-desktop navbar-item">
                        <Github className="item column is-2" />
                        <LinkedIn className="item column is-2" />
                        <Twitter className="item column is-2" />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
