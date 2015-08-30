'use strict';

/**
 * Moudle dependencies
 */
import users from '../controllers/users.controller';


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
      .post(users.create);

  app
    .route('/api/users/:userId')
      .get(users.read)
      .put(users.update)
      .delete(users.destroy)

};
