'user strict';

/**
 * Module dependencies
 */
import _ from 'lodash';


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
      title: 'Stor',
      urlTitle: _.startCase(req.params[0])
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
        url: req.originalUrl
      }),
      'application/json': () => res.json({
          error: 'Path not found'
      }),
      'default': () => res.send('Page not found')
    })

};


/**
 * Render the server error page
 */
function serverError(req, res) {

  res.status(500)
    .render('500', {
      error: 'Oops! Something went wrong...'
    })

};
