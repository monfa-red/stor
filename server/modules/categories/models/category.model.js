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
 * Instantiate Product Category Schema
 */
let categorySchema = new Schema({

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
    required: 'Category name can not be blank'
  },

  parent: {
    type: String,
  },

  author: {
    type: ObjectId,
    required: 'Category author is required',
    ref: 'User'
  }

});


/**
 * Fill in the "nameId" with the
 * kebab-cased of "name" property
 */
categorySchema.pre('save', function (next) {

  this.nameId = _.kebabCase(this.name);
  next();

});


/**
 * Instantiate the "Category" model
 */
mongoose.model('Category', categorySchema);
