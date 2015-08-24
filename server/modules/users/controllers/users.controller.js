'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';
import errors from '../../core/controllers/errors.controller';


/**
 * Get the User model
 */
let User = mongoose.model('User');



/**
 * Export methods list
 */
export default {

  create,

  read,

  update,

  destroy,

  all

};


/**
 * Create and save a user
 */
function create(req, res) {

  let user = new User(req.body);

  user
    .save(err => {
      if (err) {
        return res.status(400).send({
            message: errors.getMessage(err)
          });
      }
      res.json(user);
    })

};


function read(req, res) {

};


function update(req, res) {

};


function destroy(req, res) {

};


/**
 * Get a list of users
 */
function all(req, res) {

  User
    .find()
    .sort('-created')
    .exec((err, users) => {
      if (err) {
        return res.status(400).send({
            message: errors.getMessage(err)
          });
      }
      res.json(users);
    });

};
