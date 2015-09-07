'use strict';

/**
 * Moudle dependencies
 */
import addresses from '../controllers/addresses.controller';
import auth from '../../auth/controllers/auth.controller';


/**
 * Export addresses Routes
 */
export default addressesRouter;


/**
 *  Assign routes to controllers
 */
function addressesRouter(app) {

  app
    .route('/api/addresses')
      .get(addresses.index)
      .post(addresses.create)

  app
    .route('/api/addresses/:id')
      .get(auth.admin, addresses.show)
      .put(auth.user, addresses.update)
      .delete(auth.admin, addresses.destroy)

};
