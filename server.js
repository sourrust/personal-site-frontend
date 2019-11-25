'use strict';

require('dotenv').config();

const bodyParser = require('body-parser');
const express    = require('express');
const next       = require('next');
const extend     = require('lodash/extend');

const contactPost      = require('./server/contactPost');
const serverPublicFile = require('./server/serverPublicFile');

const port  = parseInt(process.env.PORT || '3000', 10);
const isDev = process.env.NODE_ENV !== 'production';

const application = next({ dev: isDev });
const nextHandler = application.getRequestHandler();

function createParameterHandler(page) {
    return function parameterHandler(request, response) {
        const query = extend({}, request.query, request.params);

        return application.render(request, response, page, query);
    }
}

function requestHandler(request, response) {
    const { path, query } = request;

    return application.render(request, response, path, query);
}

function defaultHandler(request, response) {
    const { path, query } = request;

    return nextHandler(request, response, path, query);
}

async function startServer() {
    const server = express();

    await application.prepare();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.post('/contact', contactPost);

    server.get(
        '/robots.txt',
        serverPublicFile('robots.txt', 'text/plain', 3600)
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
