'use strict';

// session = require('express-session'),
// MongoStore = require('connect-mongo')(session),
// multer = require('multer'),
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
import passport from 'passport';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
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
 * App Initializer
 */
function init(db) {

  // Initialize express app
  let app = express();

  localVariables(app);

  middlewares(app);

  viewEngine(app);

  clientRoutes(app);

  authStrategies(app);

  serverRoutes(app);

  errorHandler(app);

  // return Initialize express app for bootstraping
  return app;

};


/**
 * Initialize local variables
 */
function localVariables(app) {

  // Setting application local variables
  let locals = app.locals;
  locals.title = config.app.title;
  locals.description = config.app.description;
  locals.keywords = config.app.keywords;
  locals.cssFiles = paths(config.files.client.lib.css, true);
  locals.jsFiles = paths(config.files.client.lib.js, true);
  // Passing the request url to environment locals
  app.use((req, res, next) => {
    res.locals.host = req.protocol + '://' + req.hostname;
    res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
    next();
  });

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
    .use(passport.initialize());
    // .use(favicon(config.favicon));

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
 * Setting the client-side static folder[s]
 */
function clientRoutes(app) {

  // loop and define static directories
  paths(config.files.client.static)
    .forEach(dir => app.use(express.static(dir)))

};


/**
 * Mount passport strategies
 */
function authStrategies() {
  paths(config.files.server.strategies)
    .forEach(dir => require(dir))
};


/**
 * Configure the modules server routes
 * TODO: mount the router instance instead
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
