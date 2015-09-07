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
 * Order Schema
 */
let OrderSchema = new Schema({

	created: {
		type: Date,
		default: Date.now
	},

	updated: {
    type: Date
  },

	// Order owner
	user: {
		type: ObjectId,
		ref: 'User'
	},

  // cart: {
  //   type: ObjectId,
  //   ref: 'Cart'
  // },

	// Order Shipping address
	payment: {
		type: ObjectId,
		ref: 'Payment'
	},

  // Order Shipping address
  address: {
    type: ObjectId,
    ref: 'Address'
  },

  // shipping: { //delivery
  //   type: String,
  //   ref: 'Shipping'
  // }

});


/**
 * Setting OrderSchema to Order model
 */
mongoose.model('Order', OrderSchema);
