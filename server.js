'use strict';

require('dotenv').config();

const bodyParser = require('body-parser');
const express    = require('express');
const next       = require('next');
const extend     = require('lodash/extend');

const cacheableResponse = require('cacheable-response');

const asMilliseconds  = require('./server/utility/asMilliseconds');
const contactPost     = require('./server/contactPost');
const servePublicFile = require('./server/servePublicFile');

const port  = parseInt(process.env.PORT || '3000', 10);
const isDev = process.env.NODE_ENV !== 'production';

const application = next({ dev: isDev });
const nextHandler = application.getRequestHandler();

const cacheManager = cacheableResponse({
    ttl: asMilliseconds(6, 'hours'),
    get: async function getData({ req, res, path, query }) {
        const data = await application.renderToHTML(req, res, path, query);

        return { data };
    },
    send: ({ data, res }) => res.send(data)
});

function createParameterHandler(path) {
    return function parameterHandler(request, response) {
        const query = extend({}, request.query, request.params);

        if (isDev || query['no-cache']) {
            return application.render(request, response, path, query);
        }

        return cacheManager({
            req: request,
            res: response,
            path: path,
            query: query
        });
    }
}

function requestHandler(request, response) {
    const { path, query } = request;

    if (isDev || query['no-cache']) {
        return application.render(request, response, path, query);
    }

    return cacheManager({
        req: request,
        res: response,
        path: path,
        query: query
    });
}

function defaultHandler(request, response) {
    const { path, query } = request;

    return nextHandler(request, response, path, query);
}

async function startServer() {
    const server = express();

    await application.prepare();

    server.set('x-powered-by', false);
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.post('/contact', contactPost);

    server.get(
        '/robots.txt',
        servePublicFile('robots.txt', 'text/plain')
    );

    server.get('/', requestHandler);
    server.get('/projects', requestHandler);
    server.get('/projects/:slug', createParameterHandler('/projects/[slug]'));

    server.all('*', defaultHandler);

    server.listen(port, function(error) {
        if (error) {
            throw error;
        }

        console.log(`> Ready on http://localhost:${port}`);
    });
}

function handleError(error) {
    console.error(error);

    process.exit(1);
}

startServer().catch(handleError);
