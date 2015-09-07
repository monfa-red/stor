'use strict';

/**
 * Moudle dependencies
 */
import auth from '../services/auth.services';
import authController from '../controllers/auth.controller';



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
    .post(authController.signin, auth.signToken)

  app.route('/api/auth/signup')
    .post(authController.signup, auth.signToken)


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
    .get(authController.facebook.oAuth);

  app.route('/api/auth/facebook/callback')
    .get(authController.facebook.oAuthCallback, auth.signToken);

  // Google authentication
  app.route('/api/auth/google')
    .get(authController.google.oAuth);

  app.route('/api/auth/google/callback')
    .get(authController.google.oAuthCallback, auth.signToken);

};
