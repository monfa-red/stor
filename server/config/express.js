'use strict';

/**
 * Module dependencies.
 */
// var config = require('../config'),
//   express = require('express'),
//   morgan = require('morgan'),
//   bodyParser = require('body-parser'),
//   session = require('express-session'),
//   MongoStore = require('connect-mongo')(session),
//   multer = require('multer'),
//   favicon = require('serve-favicon'),
//   compress = require('compression'),
//   methodOverride = require('method-override'),
//   cookieParser = require('cookie-parser'),
//   helmet = require('helmet'),
//   flash = require('connect-flash'),
//   consolidate = require('consolidate'),
//   path = require('path');

import express from 'express';
import path from 'path';
// import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import consolidate from 'consolidate';
import config from '../config/config';


/**
 * A list of all Exported methods
 */

export default {

  initMiddlewares,

  initViewEngine,

  initSession,

  initModulesClientRoutes,

  initModulesServerRoutes,

  initErrorRoutes,

  init

};


/**
 * Initialize application middlewares
 */

function initMiddlewares(app) {

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

};


/**
 * Configure view engine
 */

function initViewEngine(app) {

  // Set swig as the template engine and assign it to .html files
  app
    .engine('html', consolidate[config.templateEngine])
      .set('view engine', 'html')
      .set('views', path.join(__dirname, '../', 'views'))

};


/**
 * Configure Express session
 */

function initSession(app) {

};

/**
 * Setting the client-side static folder
 */

function initModulesClientRoutes(app) {

  app.use(express.static(path.join(__dirname, '../', 'public')));

};


/**
 * Configure the modules server routes
 */

function initModulesServerRoutes(app) {

  // Globbing routing files
  // config.files.server.routes.forEach(function (routePath) {
  //   require(path.resolve(routePath))(app);
  // });

  config.files.server.routes.forEach( routePath => {
    // import routePath;
    // routePath(app);
    require(path.resolve(routePath))(app);
    console.log('%s imported', routePath);
  });

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
    res.redirect('/server-error');
  });

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

};




function init(db) {
  // Initialize express app
  var app = express();

  // Initialize local variables
  // this.initLocalVariables(app);

  // Initialize Express middleware
  this.initMiddlewares(app);

  // Initialize Express view engine
  this.initViewEngine(app);

  // Initialize Express session
  // this.initSession(app, db);

  // Initialize Modules configuration
  // this.initModulesConfiguration(app);

  // Initialize Helmet security headers
  // this.initHelmetHeaders(app);

  // Initialize modules static client routes
  this.initModulesClientRoutes(app);

  // Initialize modules server authorization policies
  // this.initModulesServerPolicies(app);

  // Initialize modules server routes
  this.initModulesServerRoutes(app);

  // Initialize error routes
  this.initErrorRoutes(app);

  return app;

};
