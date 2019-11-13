'use strict';

require('dotenv').config();

const bodyParser = require('body-parser');
const express    = require('express');
const next       = require('next');

const contactPost      = require('./server/contactPost');
const serverPublicFile = require('./server/serverPublicFile');

const port  = parseInt(process.env.PORT || '3000', 10);
const isDev = process.env.NODE_ENV !== 'production';

const application    = next({ dev: isDev });
const defaultHandler = application.getRequestHandler();

application.prepare()
  .then(function() {
      const server = express();

      server.use(bodyParser.json());
      server.use(bodyParser.urlencoded({ extended: true }));

      server.post('/contact', contactPost);

      server.get(
          '/robots.txt',
          serverPublicFile('robots.txt', 'text/plain', 3600)
      );

      server.all('*', defaultHandler);

      server.listen(port, function(error) {
          if (error) {
              throw error;
          }

          console.log(`> Ready on http://localhost:${port}`);
      });
  });
