'use strict';

/**
 * Moudle dependencies
 */
import path from 'path';
import glob from 'glob';
import _ from 'lodash';
import config from '../config';


/**
 * Export module
 */
export default paths;


/**
 * Glob
 */
function paths(patterns, boolean) {

  if (_.isArray(patterns)) {
    let bind = [];
    patterns
      .forEach(pattern => bind = _.union(bind, paths(pattern, boolean)));
    return bind;
  }

  if (boolean) {
    return glob.sync(patterns)
      .map(file => file.replace(config.files.client.static, ''));
  }

  return glob.sync(path.resolve(patterns));

};
