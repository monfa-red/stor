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

	updated: {
    type: Date
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

	profileImage: {
		type: String
	},

	provider: {
		type: String,
		default: 'local'
	},

	password: {
		type: String,
		required: 'Password is required'
	},

	salt: {
		type: String
	},

	profile: {},
	facebook: {},
	google: {},

	/* For reset password */
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
 * Passing UserSchema to User model
 */
mongoose.model('User', UserSchema);
