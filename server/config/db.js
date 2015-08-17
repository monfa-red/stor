'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';
import chalk from 'chalk';
import config from './config';
import events from './events';


/**
 * Export list
 */
export default {

  connect

};


/**
 * Initialize Mongoose and database connection
 */
function connect(callback) {

  mongoose
    .connect(config.db.uri, config.db.option)
    // Set debug mode if required
    .set('debug', config.db.debug)
      // handle connection error/success
      .connection
        .on('error', events.db.error)
        .on('open', () => events.db.success(callback));

}
