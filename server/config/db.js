'use strict';

/**
 * Dependencies
 */

var config = require('./config'),
  chalk = require('chalk'),
  mongoose = require('mongoose');


/**
 * Exported methods
 */
 
export default {
  connect
}

/**
 * Initialize Mongoose db connection
 */

function connect(callback) {

  mongoose

    // Connect to db
    .connect(config.db.uri, config.db.option)

    // Set debug mode if required
    .set('debug', config.db.debug)

    // handle connection error/success
    .connection
      .on('error', connectionError)
      .on('open', connectionSucess);


  function connectionError(err) {
    console.error(chalk.bgRed('Could not connect to db'), chalk.red(err));
  }

  function connectionSucess(callback) {
    // Some typhography!
    console.log("   " + chalk.bgBlue('    Connected to DB from server.js    '))
    // Call success callback if required
    if (callback) callback(db);
  }

}
