'use strict';

/**
 * Moudle dependencies
 */
import https from 'https';
import http from 'http';
import db from './lib/db';
import express from './lib/express';
import events from './lib/events';
import config from './config';
import certificate from './lib/keys/certificate';


/**
 * Load Modles, connect to database
 * and bootstap the application
 */
db
  .loadModels()
  .connect(bootStrap)


/**
 * Pass the db to "express" which returns initialized express app
 * and start the app by listening on provided port
 */
function bootStrap() {

  // Initialize express middlewares
  let app = express.init(db);

  // Create an HTTP sever and listen to required port
  http
    .createServer(app)
      .listen(config.http.port)
        .on('error', events.server.error)
        .on('listening', events.server.listening);

  // if required, Create an HTTPS server on options
  if (config.https.port) {
    https
      .createServer(certificate, app)
        .listen(config.https.port)
          .on('error', events.server.httpsError)
          .on('listening', events.server.listening);
  }

};
