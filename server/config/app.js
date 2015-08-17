'use strict';

/**
 * Moudle dependencies
 */
import config from './config';
import db from './db';
import express from './express';
import events from './events';


/**
 * connect to database and bootstap the application
 */
db.connect(bootStrap)


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
