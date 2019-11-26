'use strict';

const crypto  = require('crypto');
const fs      = require('fs');
const isEmpty = require('lodash/isEmpty');
const path    = require('path');

const cacheableResponse = require('cacheable-response');
const asMilliseconds    = require('./utility/asMilliseconds');

const isDev = process.env.NODE_ENV !== 'production';

function readFile(filePath, encoding) {
    return new Promise(function readFileHandler(resolve, reject) {
        fs.readFile(filePath, encoding, function(error, content) {
            if (error) {
                return reject(error);
            }

            resolve(content);
        });
    });
}

const cacheManager = cacheableResponse({
    ttl: asMilliseconds(30, 'days'),
    get: async function getData({ req, res, path, type }) {
        const data = {
            type: type,
            content: await readFile(path, 'utf8')
        };

        return { data };
    },
    send: function sendData({ data, res }) {
        res.set('Content-Type', data.type);

        res.send(data.content);
    }
});

function servePublicFile(file, type) {
    const filePath = path.join('public', file);

    return async function handler(request, response) {
        if (isDev || request.query['no-cache']) {
            const data = await readFile(filePath, 'utf8');

            response.set('Content-Type', type);

            return response.send(data);
        }

        return cacheManager({
            req: request,
            res: response,
            path: filePath,
            type: type
        });
    };
}

module.exports = servePublicFile;
