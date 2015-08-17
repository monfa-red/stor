
var routes = {};
    routes.index = require('./routes/index');
    routes.admin = require('./routes/admin.server.routes'),
    routes.products = require('./routes/products.server.routes');



// Define error pages
// app.route('/server-error').get(core.renderServerError);

// Return a 404 for all undefined api, module or lib routes
// app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

// Define application route

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




// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
//
// /**
//  *  error handlers
//  */
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });
