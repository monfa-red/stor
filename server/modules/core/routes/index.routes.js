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

  // 404 error for undefined api, lib, assets and app routes
  app
    .route('/:url(api|lib|assets|app)/*')
      .get(core.notFound);

  // application route
  app
    .route('/*')
      .get(core.index);

  // Forward all other requests to error handler
  app
    .use(core.serverError);

};
