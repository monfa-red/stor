'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import middlewares from 'composable-middleware';
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

  verifyToken,

  verify,

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
// function geneToken(id, role) {
//   return jwt.sign({ _id: id, role: role }, config.secret, {
//     expiresInMinutes: 60 * 5
//   });
// };


/**
 * Sign and send a jwt token
 */
function signToken(req, res) {

  if (!req.user) return res.status(401).json({
    // message: 'Something went wrong, please try again.'
    message: 'req.user not set (change this msg!)'
  })

  let token = jwt.sign({
    _id: req.user._id,
    role: req.user.role
  }, config.secret, {
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

  // Verify user "_id" before querying to db
  if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
    return res.status(400).send({
      message: 'User is not valid'
    });
  }

  User
    .findOne({
      _id: req.user._id
    })
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


function verifyUserType(userType) {
  return (req, res, next) => {

    if (!req.user.role || req.user.role !== userType) {
      return res.status(400).send({
          message: 'User is not authorized'
        });
    }
    next();

  };
};


function verify(type) {

  if (!type) {
    return (req, res, next) => {
      next(new Error('Auth verification type is not set'));
    };
  }

  if (config.userTypes.indexOf(type) === -1
      && type !== 'token'
      && type !== 'user') {
    return (req, res, next) => {
      next(new Error('Auth verification type is not valid'));
    };
  }

  if (type === 'token') {
    return verifyToken;
  }

  if (type === 'user') {
    return middlewares()
      .use(verifyToken)
      .use(loadUser)
  }

  return middlewares()
    .use(verifyToken)
    .use(verifyUserType(type))
    .use(loadUser)
    .use(verifyUserType(type));

};



function signup(req, res) {
  // For security measurement we remove the role from the req.body object
  delete req.body.role;
  delete req.body.created;

  // Init Variables
  let user = new User(req.body);
  // let message = null;

  // Add missing user fields
  user.provider = 'local';
  user.displayName = user.name.first + ' ' + user.name.last;

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
