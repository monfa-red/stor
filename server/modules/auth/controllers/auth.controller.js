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

  setToken,

  verifyToken,

  verifyUser,

  verifyAdmin,

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
function signToken(id, role) {
  return jwt.sign({ _id: id, role: role }, config.secret, {
    expiresInMinutes: 60 * 5
  });
};


/**
 * Sign and send a jwt token
 */
function setToken(req, res) {

  if (!req.user) return res.status(404).json({
    // message: 'Something went wrong, please try again.'
    message: 'req.user not set (change this msg!)'
  })
  let token = signToken(req.user._id, req.user.role);
  res.json({ token: token });

};


/**
 * Extract and validate jwt and attach it to the "req.user"
 */
function verifyToken(req, res, next) {
  
  if (!req.headers.authorization) {
    let token = (req.body && req.body.access_token) || (req.query && req.query.access_token);
    if (token) req.headers.authorization = 'Bearer ' + token;
  }

  expressJwt({
    secret: config.secret
  })(req, res, next);

};


/**
 * Attaches the user object to the request if validated jwt exist
 */
function verifyUser(req, res, next) {

  // extra ObjectId check
  // if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
  //   return res.status(400).send({
  //     message: 'User is invalid'
  //   });
  // }

  User
    .findOne({
      _id: req.user._id
    })
    .exec(function (err, user) {
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



function verifyAdmin() {
  return verifyUserType('admin');
};

function verifyUserType(userType) {
  return function(req, res, next) {

    if (!req.user.role || req.user.role === userType) {
      return res.status(400).send({
          message: 'User is not authorized'
        });
    }
    next();

  }
};


function verify(userType) {

  if (!userType) {
    return function(req, res, next) {
      next(new Error('Auth verification type is not set'));
    };
  }

  if (config.userTypes.indexOf(userType) === -1 && userType !== 'token') {
    return function(req, res, next) {
      next(new Error('Auth verification type does is not valid'));
    };
  }

  if (userType === 'token') {
    return verifyToken;
  }

  if (userType === 'user') {
    return middlewares()
      .use(verifyToken)
      .use(verifyUser)
  }

  return middlewares()
    .use(verifyToken)
    .use(verifyUserType(userType))
    .use(verifyUser);

};



function signup(req, res) {
  // For security measurement we remove the role from the req.body object
  delete req.body.role;

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
