import React from 'react';
import Document, {
    DocumentContext, Html, Head, Main, NextScript,
} from 'next/document';

interface PngProps {
    height: number;
    width: number;
}

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
    );
}

function PngIcon({ height, width }: PngProps) {
    const sizes = `${width}x${height}`;
    const href  = `//splash.nyc3.cdn.digitaloceanspaces.com/personal-site/icons/icon-${sizes}.png`;

    return <link rel="icon" type="image/png" href={ href } sizes={ sizes } />;
}

class BaseDocument extends Document {
    static async getInitialProps(context: DocumentContext) {
        const initialProps = await Document.getInitialProps(context);

        return { ...initialProps };
    }

    render() {
        const description = 'A software engineer, raised in the open source community, who loves to build systems that solve interesting problems.';

        return (
            <Html>
                <Head>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="description" content={ description } />
                    <link
                        rel="icon"
                        href="//splash.nyc3.cdn.digitaloceanspaces.com/personal-site/icons/icon.ico"
                        type="image/x-icon"
                    />
                    <PngIcon width={ 16 } height={ 16 } />
                    <PngIcon width={ 32 } height={ 32 } />
                    <PngIcon width={ 64 } height={ 64 } />
                    <PngIcon width={ 128 } height={ 128 } />
                    <PngIcon width={ 256 } height={ 256 } />
                    <PngIcon width={ 512 } height={ 512 } />
                    <meta property="og:site_name" content="Jeremy Hull" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Jeremy Hull" />
                    <meta property="og:description" content={ description } />
                    <meta property="og:url" content="https://jeremy-hull.com/" />
                    <meta name="twitter:title" content="Jeremy Hull" />
                    <meta name="twitter:description" content={ description } />
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
