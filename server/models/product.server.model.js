'use strict';

/**
 * Module dependencies
 */

var mongoose  = require('mongoose'),
      Schema  = mongoose.Schema,
           _  = require('lodash');


/**
 * Product Schema
 */

var productSchema = new Schema({

  created: {
    type: Date,
    default: Date.now
  },

  name: {
    type: String,
    default: '',
    trim: true,
    unique: true,
    required: 'Product name cannot be blank'
  },

  // TODO: Rename this
  dashName: {
    type: String
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
    type: Number,
    default: '',
    trim: true,
    required: 'Price cannot be blank'
  },

  imageURLs: {
      type: Array,
      // TODO: remove the or shorten the placeholder url
      default: ['assets/src/images/product-place-holder.png']
  },

  sale: {
    type: Boolean,
    default: false
  },

  hidden: {
    type: Boolean,
    default: false
  }
  // ,

  // // TODO: need to be finalized!
  // author: {
  //   type: Schema.ObjectId,
  //   ref: 'User'
  // },
  //
  // // TODO: need to be finalized!
  // category: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Category'
  // }

});

/**
 * Add a dash-cased property to the document
 * based on the "name".
 */
productSchema.pre('save', function (next) {

  this.dashName = _.kebabCase(this.name);
  next();

});


/**
 * Instantiate the "Product" model.
 * collection name will be set to "products" automaticly.
 */

mongoose.model('Product', productSchema);
