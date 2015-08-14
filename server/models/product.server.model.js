'use strict';

/**
 * Module dependencies
 */

var mongoose = require('mongoose'),
      Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId,
           _ = require('lodash');


/**
 * Product Schema
 */

var productSchema = new Schema({

  created: {
    type: Date,
    default: Date.now
  },

  nameId: {
    type: String
  },

  name: {
    type: String,
    default: '',
    trim: true,
    unique: true,
    required: 'Product name can not be blank'
  },

  details: {

    caption: {
      type: String,
      default: '',
      trim: true,
    },

    description: {
      type: String,
      default: '',
      trim: true,
      required: 'Product description can not be blank'
    }

  },

  price: {

    retail: {
      type: Number,
      default: 0,
      trim: true,
      required: 'Retail price can not be blank'
    },

    sale: {
      type: Number,
      trim: true
    },

    shipping: {
      type: Number,
      default: 0,
      trim: true,
      required: 'Shipping price can not be blank'
    }

  },

  images: {

    small: {
      type: Array,
      // TODO: remove this placeholder url
      default: ['assets/src/images/product-place-holder.png']
      // default: ['sdsd', 'dfdsf']
    },

    large: {
      type: Array
    }

  },

  active: {
    type: Boolean,
    default: true
  },

  featured: {
    type: Boolean,
    default: false
  },

  author: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },

  category: {
    type: ObjectId,
    // required: true,
    ref: 'Category'
  }

});


/**
 * Fill the "nameId" with the
 * dased-case of "name" property
 */

productSchema.pre('save', function (next) {

  this.nameId = _.kebabCase(this.name);
  next();

});


/**
 * Instantiate the "Product" model.
 * collection name will be set to "products" automatically
 */

mongoose.model('Product', productSchema);
