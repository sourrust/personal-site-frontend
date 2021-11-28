import React from 'react';
import Document, {
    Html, Head, Main, NextScript
} from 'next/document';

const analyticsId = process.env.GOOGLE_ANALYTICS_ID;

const gTagText = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${analyticsId}');
`;

function GoogleAnalytics() {
    const html = { __html: gTagText };
    const gTag = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;

    if (process.env.NODE_ENV !== 'production') {
        return null;
    }

    return (
        <React.Fragment>
            { /* Global site tag (gtag.js) - Google Analytics */ }
            <script async src={ gTag } />
            <script dangerouslySetInnerHTML={ html } />
        </React.Fragment>
    )
}

class BaseDocument extends Document {
    static async getInitialProps(context) {
        const initialProps = await Document.getInitialProps(context);

        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="description" content="A software engineer, raised in the open source community, who loves to build systems that solve interesting problems." />
                    <link
                        rel="shortcut icon"
                        href="//splash.nyc3.cdn.digitaloceanspaces.com/personal-site/icons/icon.ico"
                        type="image/x-icon" />
                    <link
                        rel="icon"
                        type="image/png"
                        href="//splash.nyc3.cdn.digitaloceanspaces.com/personal-site/icons/icon-16x16.png"
                        sizes="16x16" />
                    <link
                        rel="icon"
                        type="image/png"
                        href="//splash.nyc3.cdn.digitaloceanspaces.com/personal-site/icons/icon-32x32.png"
                        sizes="32x32" />
                    <link
                        rel="icon"
                        type="image/png"
                        href="//splash.nyc3.cdn.digitaloceanspaces.com/personal-site/icons/icon-64x64.png"
                        sizes="64x64" />
                    <link
                        rel="icon"
                        type="image/png"
                        href="//splash.nyc3.cdn.digitaloceanspaces.com/personal-site/icons/icon-128x128.png"
                        sizes="128x128" />
                    <link
                        rel="icon"
                        type="image/png"
                        href="//splash.nyc3.cdn.digitaloceanspaces.com/personal-site/icons/icon-256x256.png"
                        sizes="256x256" />
                    <link
                        rel="icon"
                        type="image/png"
                        href="//splash.nyc3.cdn.digitaloceanspaces.com/personal-site/icons/icon-512x512.png"
                        sizes="512x512" />
                    <meta property="og:site_name" content="Jeremy Hull" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Jeremy Hull" />
                    <meta property="og:description" content="A software engineer, raised in the open source community who, loves to build systems that solves interesting problems." />
                    <meta property="og:url" content="https://jeremy-hull.com/" />
                    <meta name="twitter:title" content="Jeremy Hull" />
                    <meta name="twitter:description" content="A software engineer, raised in the open source community who, loves to build systems that solves interesting problems." />
                    <meta name="twitter:url" content="https://jeremy-hull.com/" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <GoogleAnalytics />
                </body>
            </Html>
        );
    }
}

export default BaseDocument;
