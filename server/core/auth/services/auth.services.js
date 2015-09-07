'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';
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

  is: hasRole

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
            message: 'No account with that id has been found'
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
