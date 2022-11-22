import { NextApiResponse, NextApiRequest } from 'next';
import { ErrorRequestHandler, RequestHandler } from 'express';

function handleMiddleware(
    request: NextApiRequest,
    response: NextApiResponse,
    next: RequestHandler
) {
    return new Promise((resolve, reject) => {
        next(request as any, response as any, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}

function handleErrorMiddleware(
    error: any,
    request: NextApiRequest,
    response: NextApiResponse,
    next: ErrorRequestHandler
) {
    return new Promise((resolve, reject) => {
        next(error, request as any, response as any, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}

function runApiMiddleware(errorOrRequest: any, ...rest: any[]) {
    if (errorOrRequest instanceof Error) {
        return handleErrorMiddleware(errorOrRequest, ...rest as [
            NextApiRequest,
            NextApiResponse,
            ErrorRequestHandler
        ]);
    }

    return handleMiddleware(errorOrRequest, ...rest as [
        NextApiResponse,
        RequestHandler
    ]);
}

export default runApiMiddleware;
