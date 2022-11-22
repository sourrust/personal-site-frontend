import React    from 'react';
import Github   from './links/Github';
import LinkedIn from './links/LinkedIn';
import Twitter  from './links/Twitter';

function Footer() {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="footer has-text-centered">
            <div className="social-links">
                <Github className="social-link" />
                <LinkedIn className="social-link" />
                <Twitter className="social-link" />
            </div>
            <p>
                ©
                { year }
                {' '}
                {' '}
                — Jeremy Hull
            </p>
            <p>
                Hosted on
                {' '}
                {' '}
                <a
                    href="https://m.do.co/c/13c6a25902b3"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    DigitalOcean
                </a>
                .
            </p>
        </footer>
    );
}

export default Footer;
