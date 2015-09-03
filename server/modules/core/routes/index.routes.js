'use strict';

/**
 * Module dependencies
 */
import core from '../controllers/core.controller';


/**
 * Export core router
 */
export default coreRoutes;


/**
 * Main server routes
 */
function coreRoutes(app) {

  // default server error page
  app
    .route('/error')
      .get(core.serverError);

  // Handle api and all static routs errors
  app
    .route('/:url(api|lib|assets|app)/*')
      .get(core.notFound)
      .all(core.badRequest);

  // Application route
  app
    .route('/*')
      .get(core.index);

  // Forward all other requests to error handler
  app
    .use(core.serverError);

};
