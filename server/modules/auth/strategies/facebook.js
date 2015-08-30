/**
 * Module dependencies
 */
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import mongoose from 'mongoose';


/**
 * Get the User model
 */
let User = mongoose.model('User');


/**
 * Facebook strategy
 */
passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    // profileFields: ['id', 'name', 'displayName', 'emails', 'photos'],
    // passReqToCallback: true
  },
  (accessToken, refreshToken, profile, done) => {

    User
      .findOne({
        'facebook.id': profile.id
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
          profileImage: (profile.id)
            ? '//graph.facebook.com/' + profile.id + '/picture?type=large'
            : undefined,
          provider: 'facebook',
          facebook: profile._json
        });

        user.save(err => {
          if (err) return done(null, false, {
            message: 'Facebook login failed, email already used by other login strategy'
          });
          return done(null, user);
        });
      });

  }
));
