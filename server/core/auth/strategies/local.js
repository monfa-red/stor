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
 * Local strategy
 */
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {

    User
      .findOne({
        email: email.toLowerCase()
      })
      .exec((err, user) => {
        if (err) return done(err);

        if (!user) {
          return done(null, false, {
            message: 'This email is not registered.'
          });
        }

        if (!user.authenticate(password)) {
          return done(null, false, {
            message: 'This password is not correct.'
          });
        }

        return done(null, user);
      });

  }
));
