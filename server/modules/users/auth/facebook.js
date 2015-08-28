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
    clientID: config.strategies.facebook.clientID,
    clientSecret: config.strategies.facebook.clientSecret,
    callbackURL: config.strategies.facebook.callbackURL
    //, profileFields: ['displayName','emails']
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
          name: profile.displayName,
          email: profile.emails[0].value,
          role: 'user',
          provider: 'facebook',
          facebook: profile._json
        });

        user.save(err => {
          if (err) {
            return done(null, false, {
              message: 'Facebook login failed, email already used by other login strategy'
            });
          }
          return done(null, user);
        });
      });

  }
));
