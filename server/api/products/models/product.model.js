'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';
import getSlug from 'speakingurl';


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

	updated: {
    type: Date
  },

  slug: {
    type: String,
    unique: true
  },

  name: {
    type: String,
    trim: true,
    required: 'Product name can not be blank'
  },

  details: {
    caption: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      required: 'Product description can not be blank'
    }
  },

  price: {
    retail: {
      type: Number,
      required: 'Retail price can not be blank'
    },
    sale: {
      type: Number,
    },
    shipping: {
      type: Number,
      default: 0,
      required: 'Shipping price can not be blank'
    }
  },

  images: {
    small: {
      type: Array
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
    main: {
      type: ObjectId,
      required: 'Main category should be selected',
      ref: 'Category'
    },
    all: [{
      type: ObjectId,
      required: 'At least one category is required',
      ref: 'Category'
    }]
  }

});


/**
 * create a sematic url from "name" property
 * and put it into "slug" if not provided
 */
productSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = getSlug(this.name);
  }
  next();
});


/**
 * Instantiate "Product" model
 */
mongoose.model('Product', productSchema);
