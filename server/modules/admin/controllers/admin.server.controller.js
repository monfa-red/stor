'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  errorHandler = require('../../core/controllers/errors.server.controller');





module.exports = {

  create: function (req, res) {
    var user = new User(req.body);

    user
      .save(function (err) {
        if (err) {
          return res
            .status(400)
            .send({
              message: errorHandler.getErrorMessage(err)
            });
        } else {
          res.json(user);
        }
      });
  },

  /**
   * List users
   */
  list: function (req, res) {

    User
      .find()
      .sort('-created')
      .exec(function (err, users) {
        if (err) {
          return res
            .status(400)
            .send({
              message: errorHandler.getErrorMessage(err)
            });
        } else {
          res.json(users);
        }
    });

  }
}
