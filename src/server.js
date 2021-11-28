'use strict';

require('dotenv').config();

const Celebrate  = require('celebrate');
const bodyParser = require('body-parser');
const express    = require('express');
const extend     = require('lodash/extend');
const next       = require('next');

const contactPost = require('./server/contactPost');

const port  = parseInt(process.env.PORT || '3000', 10);
const isDev = process.env.NODE_ENV !== 'production';

const application = next({ dev: isDev });
const nextHandler = application.getRequestHandler();

function createParameterHandler(path) {
    return function parameterHandler(request, response) {
        const query = extend({}, request.query, request.params);

        return application.render(request, response, path, query);
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

    server.set('x-powered-by', false);
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.post('/contact', contactPost.validation, contactPost.handler);

    server.get('/', requestHandler);
    server.get('/projects', requestHandler);
    server.get('/projects/:slug', createParameterHandler('/projects/[slug]'));

    server.all('*', defaultHandler);

    server.use(Celebrate.errors());

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
