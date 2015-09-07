/**
 * Module dependencies
 */
import passport from 'passport';
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';
import mongoose from 'mongoose';
import config from '../../../config/config'


/**
 * Get the User model
 */
let User = mongoose.model('User');


/**
 * Google strategy
 */
passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
    // passReqToCallback: true
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
          name: {
            first: profile.name.givenName,
            last: profile.name.familyName
          },
          email: profile.emails[0].value,
          role: 'user',
          profileImage: (providerData.picture)
            ? providerData.picture
            : undefined,
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
