'use strict';

/**
 * Moudle dependencies
 */
import categories from '../controllers/categories.controller';


/**
 * Export product Routes (to: express.js)
 */
export default categoriesRouter;


/**
 *  Assign routes to controllers
 */
function categoriesRouter(app) {

  app
    .route('/api/categories')
      .get(categories.index)
      .post(categories.create);

  // app
  //   .route('/api/categories/:id')
  //     .get(categories.read)
  //     .put(categories.update)
  //     .delete(categories.destroy)

};
