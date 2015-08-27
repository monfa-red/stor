/**
 * Module dependencies
 */
import passport from 'passport';
import LocalStrategy from 'passport-local';
import mongoose from 'mongoose';


/**
 * Get the User model
 */
let User = mongoose.model('User');


/**
 *
 */
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      User.findOne({
        email: email.toLowerCase()
      }, function(err, user) {
        if (err) return done(err);

        if (!user) {
          return done(null, false, { message: 'This email is not registered.' });
        }
        // if (!user.authenticate(password)) {
          // return done(null, false, { message: 'This password is not correct.' });
        // }
        return done(null, user);
      });
    }
  ));


function auth(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);
    if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

    // var token = auth.signToken(user._id, user.role);
    // res.json({token: token});
    res.json({you:'dam exist!'})
  })(req, res, next)
}










export default auth;
