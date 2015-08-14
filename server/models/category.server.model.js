'use strict';

/**
 * Module dependencies
 */

 var mongoose = require('mongoose'),
       Schema = mongoose.Schema,
     ObjectId = Schema.Types.ObjectId,
            _ = require('lodash');


/**
 * Product Category Schema
 */

var categorySchema = new Schema({

  created: {
    type: Date,
    default: Date.now
  },

  nameId: {
    type: String,
  },

  name: {
    type: String,
    trim: true,
    required: true,
    required: 'Category name can not be blank'
  },

  author: {
    type: ObjectId,
    required: true,
    ref: 'User'
  }

});



/**
 * Add a dash-cased property to the document
 * based on the "name".
 */
categorySchema.pre('save', function (next) {

  this.nameId = _.kebabCase(this.name);
  next();

});


/**
 * Instantiate the "Category" model.
 * collection name will be set to "Categories" automatically
 */

mongoose.model('Category', productSchema);
