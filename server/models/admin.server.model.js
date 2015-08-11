'use strict';

/**
 * Module dependencies.
 */
var mongoose  = require('mongoose'),
      Schema  = mongoose.Schema,
           _  = require('lodash');



var escapeProperty = function(value) {
  return _.escape(value);
};


/**
 * User Schema
 */
var UserSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  firstName: {
    type: String,
    default: '',
    trim: true,
    // unique: true,
    required: 'First name can not be blank'
  },
  lastName: {
    type: String,
    default: '',
    trim: true,
    // unique: true,
    required: 'Last name can not be blank'
  },
  username: {
    type: String,
    unique: true,
    required: true,
    get: escapeProperty
  }
});

// var UserSchema = new Schema({
//   firstName: {
//     type: String,
//     required: true,
//     get: escapeProperty
//   },
//   LastName: {
//     type: String,
//     required: true,
//     get: escapeProperty
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
//     match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
//     validate: [validateUniqueEmail, 'E-mail address is already in-use']
//   },
//   username: {
//     type: String,
//     unique: true,
//     required: true,
//     get: escapeProperty
//   },
//   roles: {
//     type: Array,
//     default: ['authenticated', 'anonymous']
//   },
//   hashed_password: {
//     type: String,
//     validate: [validatePresenceOf, 'Password cannot be blank']
//   },
//   provider: {
//     type: String,
//     default: 'local'
//   },
//   salt: String,
//   resetPasswordToken: String,
//   resetPasswordExpires: Date,
//   profile: {},
//   facebook: {},
//   twitter: {},
//   github: {},
//   google: {},
//   linkedin: {}
// });


UserSchema.pre('save', function (next) {
  // this.dashName = dashify(this.name);
  console.log('---Saving User---');
  next();
});

mongoose.model('User', UserSchema);
