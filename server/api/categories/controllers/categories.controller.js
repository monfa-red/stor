'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';


/**
 * Get the Category model
 */
let Category = mongoose.model('Category');


/**
 * Export methods list
 */
export default {

  index,

  create,

  read,

  update,

  destroy

};


/**
 * Create and save a category
 */
function create(req, res, next) {

  let category = new Category(req.body);


  category
    .save(err => {
      if (err) return next(err);
      res.json(category);
    })

};


/**
 * Find a category by "nameId"
 */
function read(req, res, next) {

  Category
    .findOne({ 'nameId': req.params.categoryId })
     // TODO: only return necessary data
    .exec((err, category) => {
      if (err) return next(err);
      res.json(category);
    });

};


/**
 * Update a category
 */
function update(req, res, next) {

  let category = req.category;
  category.title = req.body.title;
  category.content = req.body.content;

  category
    .save(err => {
      if (err) return next(err);
      res.json(category);
    });

};


/**
 * Delete an category
 */
function destroy(req, res, next) {

  Category
    .remove({ _id: req.params.categoryId }, (err, result) => {
      if (err) return next(err);
      res.json(result);
    });

};


/**
 * Get a list of categorys
 */
function index(req, res, next) {

  Category
    .find()
    .select('-__v')
    .sort('-created')
    .populate('author', 'firstName lastName email')
    .exec((err, categorys) => {
      if (err) return next(err);
      res.json(categorys);
    });

};
