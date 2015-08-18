'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';
// import _ from 'lodash';


/**
 * Define Schema and ObjectId for ease of use
 */
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;



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
		trim: true,
		default: '',
		// validate: [validate, 'Please fill in your first name']
	},
	lastName: {
		type: String,
		trim: true,
		default: '',
		// validate: [validate, 'Please fill in your last name']
	},
	email: {
		type: String,
		trim: true,
		default: '',
		// validate: [validate, 'Please fill in your email address'],
		// match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	password: {
		type: String,

		// TODO:
		// Password stuff!
		default: '0'

	}
});

/**
 * Testing Schema.pre()
 */
UserSchema.pre('save', function(next) {
	console.log("saveed a user form user.model");
	next();
});

/**
 * Compiling UserSchema into User model
 */
mongoose.model('User', UserSchema);
