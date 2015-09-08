'use strict';

// multer = require('multer'),
// compress = require('compression'),

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
import helmet from 'helmet';
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

  helmetHeaders(app);

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
 * Configure Helmet headers configuration
 */
function helmetHeaders(app) {

  // Use helmet to secure Express headers
  const SIX_MONTHS = 15778476000;
  // app.use(helmet());
  app
    .use(helmet.contentSecurityPolicy({
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", '*.google.com'],
      // styleSrc: ['style.com'],
      // imgSrc: ['img.com'],
      // connectSrc: ['connect.com'],
      // fontSrc: ['font.com'],
      // objectSrc: ['object.com'],
      // mediaSrc: ['media.com'],
      // frameSrc: ['frame.com'],
      // sandbox: ['allow-forms', 'allow-scripts'],
      // reportUri: '/report-violation',
      reportOnly: false, // set to true if you only want to report errors
      setAllHeaders: false // set to true if you want to set all headers
    }))
    .use(helmet.xframe())
    // .use(helmet.xssFilter())
    .use(helmet.xssFilter({
      setOnOldIE: true
    }))
    .use(helmet.noSniff())
    // .use(helmet.ieNoOpen())
    .use(helmet.hsts({
      maxAge: SIX_MONTHS,
      includeSubdomains: true,
      force: true
    }))
    .disable('x-powered-by');

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

  // globe and require passport strategies
  paths(config.files.server.strategies)
    .forEach(dir => require(dir));

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
 * TODO: Clean up the mess!
 * Configure error handling
 */
function errorHandler(app) {

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

    // api error handle
   if (req.originalUrl.startsWith('/api/')) {
      delete error.status;
      delete error.title;
      return res.status(err.status || 400)
        .json(error)
    }
    // all other errors handler
    res.status(error.status)
      .render('error', error);
  });

};
