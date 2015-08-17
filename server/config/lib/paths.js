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
export default pathServer;

export {

  pathServer,

  pathClient

};



/**
 * Moudles relation to root
 */
const REL_ROOT = '../../../';


/**
 *
 */
function pathServer(patterns) {

  if (_.isArray(patterns)) {
    let pathList = [];
    patterns.forEach( pattern => {
      pathList = _.union(pathList, pathServer(pattern));
    });
    return pathList;
  }
  return glob.sync(path.resolve(__dirname, REL_ROOT, patterns));

};


/**
 *
 */
function pathClient(patterns) {

  if (_.isArray(patterns)) {
    let pathList = [];
    patterns.forEach( pattern => {
      pathList = _.union(pathList, pathClient(pattern));
    });
    return pathList;
  }
  return glob.sync(path.join(REL_ROOT, patterns))
          .map(file => file.replace(REL_ROOT +'public', ''));

};



// import config from './../config';
// console.log(pathServer(config.files.server.controllers));
// console.log(pathClient(config.files.client.lib.js));
