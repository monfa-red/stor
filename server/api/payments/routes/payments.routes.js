'use strict';

/**
 * Moudle dependencies
 */
import payments from '../controllers/payments.controller';
import auth from '../../../core/auth/services/auth.service';


/**
 * Export payments Routes
 */
export default paymentsRouter;


/**
 *  Assign routes to controllers
 */
function paymentsRouter(app) {

  app
    .route('/api/payments')
      .get(payments.index)
      .post(payments.create)

  app
    .route('/api/payments/:id')
      .get(auth.admin, payments.show)
      .put(auth.user, payments.update)
      .delete(auth.admin, payments.destroy)

};
