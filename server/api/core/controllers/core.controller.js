'user strict';

/**
 * Export core controllers
 */
export default {

 index,

 notFound,

 badRequest,

 serverError

};


/**
 * Render the application page
 */
function index(req, res) {

  res.render('index');

};


/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
function notFound(req, res, next) {

  next({
    status: 404,
    message: 'Page Not Found'
  });

};

function badRequest(req, res, next) {

  next({
    status: 400,
    message: 'Bad request'
  });

};


/**
 * Define an error and pass it to error handler
 */
function serverError(req, res, next) {

  next(new Error());

};
