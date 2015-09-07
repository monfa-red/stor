'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';


/**
 * Define Schema for ease of use
 */
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;


/**
 * Address sub-document Schema
 */
let PaymentSchema = new Schema({

	created: {
		type: Date,
		default: Date.now
	},

	updated: {
    type: Date
  },

	type: {
    type: String,
    required: 'Full name is required',
    trim: true,
  },

	CardNumber: {
    type: String,
    required: 'Full name is required',
    trim: true,
  },

	holderName: {
    type: String,
    required: 'Card holder full name is required',
    trim: true,
  },

	expiration: {
		month: {
			type: Number,
			required: 'Please select your card expiration month'
		},
		year: {
			type: Number,
			required: 'Please select your card expiration year'
		}
	},

	// Payment Address
	address: {
		type: ObjectId,
		ref: 'Address'
	}

});


/**
 * Setting PaymentSchema to Payment model
 */
mongoose.model('Payment', PaymentSchema);
