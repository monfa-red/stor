/**
 * Module dependencies
 */
import passport from 'passport';
import {OAuth2Strategy} as GoogleStrategy from 'passport-google-oauth';
import mongoose from 'mongoose';


/**
 * Get the User model
 */
let User = mongoose.model('User');


/**
 * Google strategy
 */
passport.use(new GoogleStrategy({
    clientID: config.strategies.google.clientID,
    clientSecret: config.strategies.google.clientSecret,
    callbackURL: config.strategies.google.callbackURL
  },
  (accessToken, refreshToken, profile, done) => {

    User
      .findOne({
        'google.id': profile.id
      })
      .exec((err, user) => {
        if (err) return done(err);

        if (user) return done(null, user);

        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          role: 'user',
          provider: 'google',
          google: profile._json
        });

        user.save(err => {
          if (err) return done(null, false, {
            message: 'Google login failed, email already used by other login strategy'
          });
          return done(null, user);
        });
      });

  }
));
