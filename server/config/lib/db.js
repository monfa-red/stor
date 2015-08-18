'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';
import chalk from 'chalk';
import paths from './paths';
import events from './events';
import config from '../config';


/**
 * Export list
 */
export default {

  connect,

  loadModels

};

/**
 * Load Mongoose models
 */
function loadModels() {

  paths(config.files.server.models)
    .forEach(model => require(model));

  return this;

}


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

  return this;
  
}
