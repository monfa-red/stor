'user strict';

/**
 * Export core controllers
 */
export default {

 index,

 notFound,

 serverError

};


/**
 * Render the application page
 */
function index(req, res) {

  res.render('index', {
      title: 'Stor'
    });

};


/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
function notFound(req, res) {

  res.status(404)
    .format({
      'text/html': () => res.render('404', {
        url: req.originalUrl,
        title: '404 Page Not Found'
      }),
      'application/json': () => res.json({
          error: 'Path Not Found'
      }),
      'default': () => res.send('Page Not Found')
    })

};


/**
 * Define an error and pass it to error handler
 */
function serverError(req, res, next) {

  next(new Error());

};
