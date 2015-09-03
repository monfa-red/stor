'use strict';

/**
 * Module dependencies
 */
import fs from 'fs';
import config from '../config';


/**
 * Export key and cert object
 */
export default certificate;


/**
 * Read ssl keys and pass it to an object
 */
function certificate() {

  if (config.https.port) {
    return {
      key: fs.readFileSync(config.https.key),
      cert: fs.readFileSync(config.https.cert)
    };
  }

};
