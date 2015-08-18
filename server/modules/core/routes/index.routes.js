'use strict';

/**
 * Export index router
 */
export default function (app) {

  app.get('/*', function(req, res) {
    res.render('index', { title: 'Stor' });
  });

};
