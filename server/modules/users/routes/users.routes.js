'use strict';

/**
 * Moudle dependencies
 */
import users from '../controllers/users.controller';
import auth from '../../../config/lib/auth';


/**
 * Export users Routes (to: express.js)
 */
export default usersRouter;


/**
 *  Assign routes to controllers
 */
function usersRouter(app) {

  app
    .route('/api/users')
      .get(users.all)
      .post(auth, users.create);

  app
    .route('/api/users/:userId')
      .get(users.read)
      .put(users.update)
      .delete(users.destroy)

};
