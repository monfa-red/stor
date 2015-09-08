'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';
import passport from 'passport';
import _ from 'lodash';
import config from '../../../config/config';
import auth from '../services/auth.service';


/**
 * Get the User model
 */
let User = mongoose.model('User');


/**
 * Export authentication controllers
 */
export default  _.extend(auth, {

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

});


/**
 * Create and save a user with local provider
 */
function signup(req, res, next) {

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
