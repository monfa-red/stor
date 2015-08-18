'use strict';

// session = require('express-session'),
// MongoStore = require('connect-mongo')(session),
// multer = require('multer'),
// favicon = require('serve-favicon'),
// compress = require('compression'),
// methodOverride = require('method-override'),
// helmet = require('helmet'),
// flash = require('connect-flash'),

/**
 * Module dependencies.
 */
import express from 'express';
import path from 'path';
// import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import consolidate from 'consolidate';
import paths from './paths';
import config from '../config';


/**
 * Export list
 */
export default {

  init

};


/**
 * Moudles relation to root
 */
const REL_ROOT = '../../../';


/**
 * App Initializer
 */
function init(db) {

  // Initialize express app
  let app = express();

  // local variables this.initLocalVariables(app);

  // Initialize Express middleware
  initMiddlewares(app);

  initViewEngine(app);

  // Express session initSession(app, db);
  // Modules configuration initModulesConfiguration(app);
  // Helmet security headers initHelmetHeaders(app);

  initClientRoutes(app);

  // modules server authorization policies initModulesServerPolicies(app);

  initServerRoutes(app);

  // Initialize error routes
  initErrorRoutes(app);

  // return Initialize express app for bootstraping
  return app;

};


/**
 * Initialize application middlewares
 */
function initMiddlewares(app) {

  app
    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cookieParser());

};


/**
 * Configure view engine
 */
function initViewEngine(app) {

  // Set swig as the template engine and assign it to .html files
  app
    .engine('html', consolidate[config.templateEngine])
      .set('view engine', 'html')
      .set('views', paths(config.files.server.views))
};


/**
 * Configure Express session
 */
function initSession(app) {

};


/**
 * Setting the client-side static folder[s]
 */
function initClientRoutes(app) {

  // loop and define static directories
  paths(config.files.client.static)
    .forEach(dir => app.use(express.static(dir)))

};


/**
 * Configure the modules server routes
 */
function initServerRoutes(app) {

  // globe and require server routes
  paths(config.files.server.routes)
    .forEach(dir => require(dir)(app))

};


/**
 * Configure error handling
 */
function initErrorRoutes(app) {

  app.use(function (err, req, res, next) {
    // If the error object doesn't exists
    if (!err) {
      return next();
    }
    // Log it
    console.error(err.stack);

    // Redirect to error page
    res.redirect('/error-page');
  });

  // catch 404 and forward to error handler
  // app.use(function(req, res, next) {
  //   var err = new Error('Not Found');
  //   err.status = 404;
  //   next(err);
  // });

};
