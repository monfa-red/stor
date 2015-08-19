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

  // local variables this.LocalVariables(app);

  // Initialize Express middleware
  middlewares(app);

  viewEngine(app);

  // Express session
  session(app, db);
  // Modules configuration ModulesConfiguration(app);
  // Helmet security headers HelmetHeaders(app);

  clientRoutes(app);

  // modules server authorization policies ModulesServerPolicies(app);

  serverRoutes(app);

  // Initialize error routes
  errorHandler(app);

  // return Initialize express app for bootstraping
  return app;

};


/**
 * Initialize application middlewares
 */
function middlewares(app) {

  app
    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cookieParser())
      .set('showStackError', true);

};


/**
 * Configure view engine
 */
function viewEngine(app) {

  // Set swig as the template engine and assign it to ".html" files
  app
    .engine('html', consolidate[config.templateEngine])
      .set('view engine', 'html')
      .set('views', paths(config.files.server.views))

};


/**
 * Configure Express session
 */
function session(app, db) {

};


/**
 * Setting the client-side static folder[s]
 */
function clientRoutes(app) {

  // loop and define static directories
  paths(config.files.client.static)
    .forEach(dir => app.use(express.static(dir)))

};


/**
 * Configure the modules server routes
 */
function serverRoutes(app) {

  // globe and require server routes
  paths(config.files.server.routes)
    .forEach(dir => require(dir)(app))

};


/**
 * Configure error handling
 */
function errorHandler(app) {

  // final error handlers
  app.use((err, req, res, next) => {

    let error = {
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
    };
    error.title = error.status + ' ' + error.message;

    // Print stacktrace only in development
    if (app.get('env') === 'development') {
      error.stack = err.stack;
    }

    res.status(error.status)
      .render('500', error);
  });

};
