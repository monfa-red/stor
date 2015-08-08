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
  productName: {
    type: String,
    default: '',
    trim: true,
    required: 'Product name cannot be blank'
  },
  productCaption: {
    type: String,
    default: '',
    trim: true,
  },
  productDescription: {
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
  productImageURL: {
    type: String,
    default: 'assets/src/imgaes/product-place-holder.png'
  }
  // , TODO: figure this out!
  // user: {
  //   type: Schema.ObjectId,
  //   ref: 'User'
  // }
});

mongoose.model('Product', ProductSchema);
