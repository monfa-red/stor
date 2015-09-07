'use strict';

/**
 * Moudle dependencies
 */
import authorize from '../controllers/auth.controller';
import auth from '../services/auth.services';



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
    .post(authorize.signin, auth.signToken)

  app.route('/api/auth/signup')
    .post(authorize.signup, auth.signToken)


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
    .get(authorize.facebook.oAuth);

  app.route('/api/auth/facebook/callback')
    .get(authorize.facebook.oAuthCallback, auth.signToken);

  // Google authentication
  app.route('/api/auth/google')
    .get(authorize.google.oAuth);

  app.route('/api/auth/google/callback')
    .get(authorize.google.oAuthCallback, auth.signToken);

};
