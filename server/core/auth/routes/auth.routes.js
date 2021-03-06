'use strict';

/**
 * Moudle dependencies
 */
import auth from '../controllers/auth.controller';



/**
 * Export authentiocation Routes
 */
export default authRouter;


/**
 *  Assign auth routes to the controllers
 */
function authRouter(app) {

  // Local authentication
  app.route('/api/auth/signin')
    .post(auth.signin, auth.signToken)

  app.route('/api/auth/signup')
    .post(auth.signup, auth.signToken)


  app.route('/api/auth/test')
    .post(auth.admin,  (req, res, next) => {
      res.send(req.user)
    })
  //
  // app.route('/api/auth/forgot')
  //   .post(auth.forgot);
  //
  // app.route('/api/auth/reset')
  //   .post(auth.reset)
  //
  // app.route('/api/auth/reset/:token')
  //   .get(auth.validateResetToken);


  // Facebook authentication
  app.route('/api/auth/facebook')
    .get(auth.facebook.oAuth);

  app.route('/api/auth/facebook/callback')
    .get(auth.facebook.oAuthCallback, auth.signToken);

  // Google authentication
  app.route('/api/auth/google')
    .get(auth.google.oAuth);

  app.route('/api/auth/google/callback')
    .get(auth.google.oAuthCallback, auth.signToken);

};
