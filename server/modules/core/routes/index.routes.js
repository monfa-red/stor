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

  // 404 error for undefined api routes and lib, assets and app public folders
  app
    .route('/:url(api|lib|assets|app)/*')
      .get(core.notFound);

  // application route
  app
    .route('/*')
      .get(core.index)

};
