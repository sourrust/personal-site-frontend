'use strict';

const crypto  = require('crypto');
const fs      = require('fs');
const isEmpty = require('lodash/isEmpty');
const path    = require('path');

function serverPublicFile(file, type, maxAge) {
    const cache = {};

    const filePath = path.join('public', file);

    return function handler(request, response, next) {
        if (!isEmpty(cache)) {
            response.writeHead(200, cache.headers);
            response.end(cache.payload);

            return;
        }

        fs.readFile(filePath, function(error, buffer) {
            if (error) {
                return next(error);
            }

            const content = buffer.toString();
            const etag    = crypto.createHash('md5').update(content, 'utf8');

            cache.payload = content;
            cache.headers = {
                'Content-Type': type,
                'Content-Length': Buffer.from(content).length,
                'ETag': `"${etag.digest('hex')}"`,
                'Cache-Control': `public, max-age=${maxAge}`
            };

            response.writeHead(200, cache.headers);
            response.end(cache.payload);
        });
    };
}

module.exports = serverPublicFile;
