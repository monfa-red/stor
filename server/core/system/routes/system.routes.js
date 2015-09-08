'use strict';

/**
 * Module dependencies
 */
import system from '../controllers/system.controller';


/**
 * Export system router
 */
export default systemRoutes;


/**
 * Main server routes
 */
function systemRoutes(app) {

  // default server error page
  app
    .route('/error')
      .get(system.serverError);

  // Handle api and all static routs errors
  app
    .route('/:url(api|lib|assets|app)/*')
      .get(system.notFound)
      .all(system.badRequest);

  // Application route
  app
    .route('/*')
      .get(system.index);

  // Forward all other requests to error handler
  app
    .use(system.serverError);

};
