'use strict';

/**
 * Module dependencies
 */
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../../../config/config';


/**
 * Export authentication controllers
 */
export default  {

  signToken,

  setToken,

  signin,
  signup,

  facebook: {
    oAuth: facebookOAuth,
    oAuthCallback: facebookCallback
  },

  google: {
    oAuth: googleOAuth,
    oAuthCallback: googleCallback
  }

};


/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, role) {
  return jwt.sign({ _id: id, role: role }, config.secret, {
    expiresInMinutes: 60 * 5
  });
};

/**
 * Set token cookie directly for oAuth strategies
 */
function setToken(req, res) {
  if (!req.user) return res.status(404).json({
    // message: 'Something went wrong, please try again.'
    message: 'req.user not set (change this msg!)'
  })
  let token = signToken(req.user._id, req.user.role);
  // res.cookie('token', JSON.stringify(token));
  res.json({ token: token });
};







function signup(req, res) {
  // For security measurement we remove the roles from the req.body object
  delete req.body.roles;

  // Init Variables
  var user = new User(req.body);
  var message = null;

  // Add missing user fields
  user.provider = 'local';
  user.displayName = user.firstName + ' ' + user.lastName;

  // Then save the user
  user.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      req.login(user, function (err) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
    }
  });
};


// function signin(req, res, next) {
//   passport.authenticate('local', function (err, user, info) {
//     if (err || !user) {
//       res.status(400).send(info);
//     } else {
//       // Remove sensitive data before login
//       user.password = undefined;
//       user.salt = undefined;
//
//       req.login(user, function (err) {
//         if (err) {
//           res.status(400).send(err);
//         } else {
//           res.json(user);
//         }
//       });
//     }
//   })(req, res, next);
// };


/**
 * Passport local authentication
 */
function signin(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    let error = err || info;
    if (error) return res.status(401).json(error);
    if (!user) return res.status(404).json({
      message: 'Something went wrong, please try again.'
    });
    req.user = user;
    next();
  })(req, res, next)
};


/**
 * Passport Facebook authentication and callback
 */
function facebookOAuth(req, res, next) {
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile'],
    failureRedirect: config.oAuthFailureRedirect,
    session: false
  })(req, res, next);
};

function facebookCallback(req, res, next) {
  passport.authenticate('facebook', {
    failureRedirect: config.oAuthFailureRedirect,
    session: false
  })(req, res, next);
};


/**
 * Passport Google authentication and callback
 */
function googleOAuth(req, res, next) {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    failureRedirect: config.oAuthFailureRedirect,
    session: false
  })(req, res, next);
};

function googleCallback(req, res, next) {
  passport.authenticate('google', {
    failureRedirect: config.oAuthFailureRedirect,
    session: false
  })(req, res, next);
};
