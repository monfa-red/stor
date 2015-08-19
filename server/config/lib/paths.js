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
 * Moudles relation to root
 */
const REL_ROOT = '../../../';


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
    return glob.sync(path.join(REL_ROOT, patterns))
      .map(file => file.replace(REL_ROOT + config.files.client.static, ''));
  }

  return glob.sync(path.resolve(__dirname, REL_ROOT, patterns));

};
