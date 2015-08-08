'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Product name cannot be blank'
  },
  caption: {
    type: String,
    default: '',
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
    required: 'Product description cannot be blank'
  },
  price: {
    type: String,
    default: '',
    trim: true,
    required: 'Price cannot be blank'
  },
  imageURLs: {
    type: Array,
    default: ['assets/src/imgaes/product-place-holder.png']
  },
  sale: {
    type: Boolean,
    default: false
  }
  // , TODO: figure this out!
  // user: {
  //   type: Schema.ObjectId,
  //   ref: 'User'
  // }
});

mongoose.model('Product', ProductSchema);
