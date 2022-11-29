import { ErrorProps as Props } from 'next/error';
import { ServerResponse } from 'http';
import {
    GetServerSidePropsContext as Context,
    GetServerSidePropsResult as ServerResult,
} from 'next';

import Head  from 'next/head';
import React from 'react';

import NavigationHero from '../components/NavigationHero';

type ServerProps = { [key: string]: any };
type StatusCodes = { [key: number]: string };

const statusCodes: StatusCodes = {
    400: 'Bad Request',
    404: 'No page was found',
    500: 'Internal Server Error',
    501: 'Not Implemented',
};

function getStatusCode(response: ServerResponse) {
    return (response && response.statusCode) || 500;
}

function BaseError({ statusCode }: Props) {
    return (
        <React.Fragment>
            <Head>
                <title>
                    { statusCode }
                    {' '}
                    | Jeremy Hull
                </title>
            </Head>
            <NavigationHero>
                <div className="container has-text-centered">
                    <h1 className="title">{ statusCode }</h1>
                    <h2 className="subtitle">
                        { statusCodes[statusCode] }
                    </h2>
                </div>
            </NavigationHero>
        </React.Fragment>
    );
}

export async function getServerSideProps(context: Context): Promise<ServerResult<ServerProps>> {
    const statusCode = getStatusCode(context.res);

    return {
        props: { statusCode },
    };
}

export default BaseError;
