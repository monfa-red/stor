'use strict';

/**
 * Moudle dependencies
 */
import db from './lib/db';
import express from './lib/express';
import events from './lib/events';
import config from './config';


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

  express
    .init(db)
      .listen(config.port)
        .on('error', events.server.error)
        .on('listening', events.server.listening);

}
