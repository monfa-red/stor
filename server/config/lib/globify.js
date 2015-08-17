'use strict';

/**
 * Moudle dependencies
 */
import path from 'path';
import glob from 'glob';
import _ from 'lodash';


/**
 * Export list
 */
export default function globify;

export function clientify;



/**
 * Moudles relation to root
 */
const REL_ROOT = '../../../';


/**
 *
 */
function globify(patterns) {

  if (_.isArray(patterns)) {
    let pathList = [];
    patterns.forEach( pattern => {
      pathList = _.union(pathList, globify(pattern));
    });
    return pathList;
  }
  return glob.sync(path.resolve(__dirname, REL_ROOT, patterns));

};


/**
 *
 */
function clientify(patterns) {

  if (_.isArray(patterns)) {
    let pathList = [];
    patterns.forEach( pattern => {
      pathList = _.union(pathList, clientify(pattern));
    });
    return pathList;
  }
  return glob.sync(path.join(REL_ROOT, patterns))
          .map(file => file.replace(REL_ROOT +'public', ''));

};



// import config from './../config';
// console.log(globify(config.files.server.controllers));
// console.log(clientify(config.files.client.lib.js));
