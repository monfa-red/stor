'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import use from 'composable-middleware';
import config from '../../../config/config';


/**
 * Get the User model
 */
let User = mongoose.model('User');


/**
 * Export authentication controllers
 */
export default  {

  signToken,

  token: verifyToken,

  user: use(verifyToken, loadUser),

  admin: use(verifyToken, loadUser, hasRole('admin')),

  is: hasRole,

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
 * Sign and send a jwt token
 */
function signToken(req, res, next) {

  if (!req.user) {
    return next(new Error('User is not attached to req object'));
  }

  let token = jwt.sign(req.user.token, config.secret, {
      expiresInMinutes: config.tokenExpiration
    });
  res.json({ token: token });

};


/**
 * Extract and validate jwt and attach it to the "req.user"
 */
function verifyToken(req, res, next) {

  if (!req.headers.authorization) {
    let token = (req.body && req.body.access_token)
          || (req.query && req.query.access_token);
    if (token) req.headers.authorization = 'Bearer ' + token;
  }

  expressJwt({
    secret: config.secret
  })(req, res, next);

};


/**
 * Attaches the user object to the request if validated jwt exist
 */
function loadUser(req, res, next) {

  // Verify user id before querying to db
  if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
    return res.status(400).send({
      message: 'User is not valid'
    });
  }

  User
    .findOne({
      _id: req.user._id
    })
    .select('-salt -password')
    .exec((err, user) => {
      if (err) return next(err);
      if (!user) {
        return res.status(400).send({
            message: 'No account with that username has been found'
          });
      }
      req.user = user;
      next();
    });

};


/**
 * Restrict to only users who have that role
 */
function hasRole(type) {

  if (!type || type.length === 0 ) {
    return next(new Error('Auth restriction type is not set'));
  }

  // TODO: should also check and array
  return (req, res, next) => {
    if (!req.user.role || req.user.role !== type) {
      return res.status(401).send({
          message: 'User is not authorized'
        });
    }
    next();
  };

};



/**
 * Create and save a user with local provider
 */
function signup(req, res) {

  // For , we remove the role from the req.body
  delete req.body.role;
  delete req.body.created;

  // Init Variables
  let user = new User(req.body);

  // Add missing user fields
  // user.provider = 'local';
  // user.displayName = user.name.first + ' ' + user.name.last;

  user
    .save(err => {
      if (err) return next(err);

      // Remove sensitive data before login
      // user.password = undefined;
      // user.salt = undefined;

      req.user = user;
      next();
    })

};


/**
 * Passport local authentication
 */
function signin(req, res, next) {

  passport.authenticate('local', (err, user, info) => {
    let error = err || info;
    if (error) return res.status(401).json(error);
    if (!user) return res.status(404).send({
      message: 'Something went wrong, please try again.'
    });
    req.user = user;
    next();
  })(req, res, next)

};


/**
 * TODO: not finilized
 */
function changePassword(req, res, next) {

  let userId = req.user._id;
  let oldPass = String(req.body.oldPassword);
  let newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(!user.authenticate(oldPass)) {
      return res.status(403).send({
        message: 'This password is not correct.'
      });
    }

    user.password = newPass;
    user.save(function(err) {
      if (err) return next(err);
      res.status(200).send({
        message: 'Password change successful'
      });
    });
  });

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
