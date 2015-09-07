'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';


/**
 * Define Schema for ease of use
 */
let Schema = mongoose.Schema;


/**
 * Address sub-document Schema
 */
let AddressSchema = new Schema({

	created: {
		type: Date,
		default: Date.now
	},

	updated: {
    type: Date
  },

	fullName: {
    type: String,
    required: 'Full name is required',
    trim: true,
  },

  address1: {
    type: String,
    required: 'Address is required',
    trim: true,
  },

  address2: {
    type: String,
    trim: true,
  },

  city: {
    type: String,
    // required: 'City name can not be blank',
    trim: true,
  },

  province: {
    type: String,
    // required: 'Please select a province',
    trim: true,
  },

  country: {
    type: String,
    // required: 'Please select a country',
    trim: true,
  },

  zip: {
    type: String,
    // required: 'Postal Code/ZIP is required',
    trim: true,
  },

  phone: {
    type: Number,
    // required: 'Telephone number is required',
    trim: true,
  }

});


/**
 * Setting AddressSchema to Address model
 */
mongoose.model('Address', AddressSchema);
