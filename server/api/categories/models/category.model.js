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
 * Instantiate Product Category Schema
 */
let categorySchema = new Schema({

  created: {
    type: Date,
    default: Date.now
  },

  slug: {
    type: String,
    unique: 'Semantic url already exists'
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
 *  create a sematic url from "name" property
 * and put it into "slug" if not provided
 */
categorySchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = getSlug(this.name);
  }
  next();
});


/**
 * Instantiate the "Category" model
 */
mongoose.model('Category', categorySchema);
