'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';
import crypto from 'crypto';
// import _ from 'lodash';


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

	name: {
		first: {
			type: String,
			trim: true,
			default: ''
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
		lowercase: true
		// validate: [validate, 'Please fill in your email address'],
		// match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},

	password: {
		type: String,
		required: 'Password is required'
	},

	profileImage: String,

	provider: String,

	salt: String,

	resetPasswordToken: String,

	resetPasswordExpires: Date,

	profile: {},

	facebook: {},

	google: {}


});

/**
 * Virtuals
 */
// Public profile information
// UserSchema
// 	.virtual('profile')
// 		.get(() => {
// 				return {
// 					'name': this.name,
// 					'role': this.role
// 				};
// 			});

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
	  .get(() => {
	    return {
	      '_id': this._id,
	      'role': this.role
	    };
	  });


/**
 * UserSchema Methods
 */
UserSchema.methods = {

	isAdmin,

	authenticate,

	makeSalt,

	encryptPassword,

};


/**
 * IsAdmin - check if the user is an administrator
 */
function isAdmin() {
	return this.role !== 'admin';
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
 * Pre-save hook
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.isModified('password') && this.password.length >= 6) {
		this.salt = makeSalt();
		this.password = this.encryptPassword(this.password);
		next();
	}
	next(new Error('Invalid Password'));
});


/**
 * Compiling UserSchema into User model
 */
mongoose.model('User', UserSchema);
