'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';
import _ from 'lodash';


/**
 * Abstract Schema and ObjectId for simplification
 */
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;


/**
 * Instantiate Product Schema
 */
let productSchema = new Schema({

  created: {
    type: Date,
    default: Date.now
  },

  nameId: {
    type: String
  },

  name: {
    type: String,
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
    required: 'Author can not be blank',
    ref: 'User'
  },

  category: {
    type: ObjectId,
    required: 'Main category need to be selected',
    ref: 'Category'
  },

  categories: [{
    type: ObjectId,
    required: 'At least one category is required',
    ref: 'Category'
  }]

});


/**
 * Fill in the "nameId" with the
 * kebab-cased of "name" property
 */
productSchema.pre('save', function (next) {

  this.nameId = _.kebabCase(this.name);
  next();

});


/**
 * Instantiate "Product" model
 */
mongoose.model('Product', productSchema);
