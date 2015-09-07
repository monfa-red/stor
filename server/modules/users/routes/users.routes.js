'use strict';

/**
 * Moudle dependencies
 */
import users from '../controllers/users.controller';
import auth from '../../auth/controllers/auth.controller';


/**
 * Export users Routes
 */
export default usersRouter;


/**
 *  Assign routes to controllers
 */
function usersRouter(app) {

  app
    .route('/api/users')
      .get(users.index)
      // .get(auth.admin, users.all)


  app
    .route('/api/users/me')
      .get(auth.token, users.me)

  app
    .route('/api/users/:userId')
      .get(auth.admin, users.show)
      .put(auth.user, users.update)
      .delete(auth.admin, users.destroy)

};
