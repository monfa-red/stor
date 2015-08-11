/**
 * TODO:
 * Fix The mess here!
 */


var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var chalk = require('chalk');
var mongoose = require('mongoose');


// Main Config file
var config = require('./config/config');


// Routings
var routes = {};
    routes.index = require('./routes/index');
    routes.admin = require('./routes/admin.server.routes'),
    routes.products = require('./routes/products.server.routes');
// var routes.users = require('./routes/users');
// var routes.products = require('./routes/products');




/**
 *  Bootstrap db connection
 */
var db = mongoose.connect(config.db, function(err) {
  if (err) {
    console.error(chalk.bgRed('Could not connect to MongoDB'));
    console.error(chalk.red(err));
  } else {
    // Some cool typhography!
    console.log("   " + chalk.bgBlue('    Connected to DB from server.js    '))
  }
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../', 'public')));

// Define error pages
// app.route('/server-error').get(core.renderServerError);

// Return a 404 for all undefined api, module or lib routes
// app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

// Define application route

// app.route('/*').get(routes.index);
/**
 * TODO:
 * FIX THIS MESS!!!
 */
app.use('/api/products', routes.products);
app.use('/api/admin', routes.admin);
app.use('/', routes.index);
app.use('/ass', routes.index);
app.use('/products', routes.index);
app.use('/admin', routes.index);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
