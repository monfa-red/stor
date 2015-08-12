'use strict';

/**
 * Dependencies
 */

var config = require('./config'),
  chalk = require('chalk'),
  mongoose = require('mongoose');



/**
 * Initialize Mongoose db connection
 */

module.exports.connect = function(cb) {

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

  function connectionSucess() {
    // Some typhography!
    console.log("   " + chalk.bgBlue('    Connected to DB from server.js    '))
    // Call success callback if required
    if (cb) cb(db);
  }

}
