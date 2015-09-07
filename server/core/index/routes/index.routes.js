'use strict';

/**
 * Module dependencies
 */
import index from '../controllers/index.controller';


/**
 * Export index router
 */
export default indexRoutes;


/**
 * Main server routes
 */
function indexRoutes(app) {

  // default server error page
  app
    .route('/error')
      .get(index.serverError);

  // Handle api and all static routs errors
  app
    .route('/:url(api|lib|assets|app)/*')
      .get(index.notFound)
      .all(index.badRequest);

  // Application route
  app
    .route('/*')
      .get(index.index);

  // Forward all other requests to error handler
  app
    .use(index.serverError);

};
