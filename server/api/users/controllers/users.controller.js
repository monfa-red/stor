'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';


/**
 * Get the User model
 */
let User = mongoose.model('User');


/**
 * Export user controllers
 */
export default {

  index,

  me,

  show,

  update,

  destroy

};

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/xxx              ->  index
 * POST    /api/xxx              ->  create
 * GET     /api/xxx/:id          ->  show
 * PUT     /api/xxx/:id          ->  update
 * DELETE  /api/xxx/:id          ->  destroy
 */


/**
 * Show users own profile
 */
function me(req, res, next) {

  if(!req.user || !req.user.email) {
    return next(new Error('User is not attached to req object'));
  }
  res.json(req.user || null);

};





function show(req, res) {

};


function update(req, res) {

};


function destroy(req, res) {

};


/**
 * Get a list of users
 */
function index(req, res) {

  User
    .find()
    .limit(16)
    .select('-salt -password')
    .sort('-created')
    .exec((err, users) => {
      if (err) return next(err);
      res.json(users);
    });

};
