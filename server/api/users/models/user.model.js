'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';
import crypto from 'crypto';


/**
 * Define Schema and ObjectId for ease of use
 */
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;


/**
 * User Schema
 */
let UserSchema = new Schema({

	created: {
		type: Date,
		default: Date.now
	},

	updated: {
    type: Date
  },

	name: {
		first: {
			type: String,
			trim: true
		},
		last: {
			type: String,
			trim: true
		}
	},

	role: {
    type: String,
    default: 'user'
  },

	email: {
		type: String,
		trim: true,
		required: 'Email is required',
		unique: true,
		lowercase: true,
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
	},

	provider: {
		type: String,
		default: 'local'
	},

	image: {
		type: String
	},

	password: {
		type: String,
		required: 'Password is required'
	},

	salt: {
		type: String
	},

	// User Address book
	addresses: {
		type: ObjectId,
		ref: 'Address'
	},

	// Payment methods sub-doc
	payments: {
		type: ObjectId,
		ref: 'Payment'
	},

	facebook: {},
	google: {},

	// For reset password
	resetPasswordToken: String,
	resetPasswordExpires: Date

});

/**
 * Virtuals
 */
// Public profile information
// UserSchema
// 	.virtual('displayName')
// 	.get(function() {
// 		return {
// 			'name': this.name,
// 			'role': this.role
// 		};
// 	});

// Non-sensitive data to sign a token with
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });


/**
 * UserSchema Methods
 */
UserSchema.methods = {

	authenticate,

	makeSalt,

	encryptPassword,

};

/**
 * Authenticate - check if the passwords are the same
 */
function authenticate(password) {
	return this.password === this.encryptPassword(password);
};


/**
 * Make salt
 */
function makeSalt(byteSize = 16) {
	return crypto
					.randomBytes(byteSize)
						.toString('base64');
};

/**
 * Encrypt Password
 */
function encryptPassword(password) {
	if (!password || !this.salt) {
    return null;
  }

  let iterations = 10000;
  let keyLength = 64;
  let salt = new Buffer(this.salt, 'base64');

  return crypto
		.pbkdf2Sync(password, salt, iterations, keyLength)
    	.toString('base64');
};




/**
 * Make salt and encrypt password if it's moddifed
 */
UserSchema.pre('save', function(next) {
	// check if the password is just filled and > 6
	if (this.password && this.isModified('password') && this.password.length >= 6) {
		this.salt = makeSalt();
		this.password = this.encryptPassword(this.password);
	}
	next();
});


/**
 * Instantiate "User" model
 */
mongoose.model('User', UserSchema);
