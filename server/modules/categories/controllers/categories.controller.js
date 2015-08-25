'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';
import errors from '../../core/controllers/errors.controller';


/**
 * Get the Category model
 */
let Category = mongoose.model('Category');


/**
 * Export methods list
 */
export default {

  create,

  read,

  update,

  destroy,

  all

};


/**
 * Create and save a category
 */
function create(req, res) {

  let category = new Category(req.body);


  category
    .save(err => {
      if (err) {
        return res.status(400).send({
            message: errors.getMessage(err)
          });
      }
      res.json(category);
    })

};


/**
 * Find a category by "nameId"
 */
function read(req, res) {

  Category
    .findOne({ 'nameId': req.params.categoryId })
     // TODO: only return necessary data
    .exec((err, category) => {
      if (err) {
        return res.status(400).send({
            message: errors.getMessage(err)
          });
      }
      res.json(category);
    });

};


/**
 * Update a category
 */
function update(req, res) {

  let category = req.category;
  category.title = req.body.title;
  category.content = req.body.content;

  category
    .save(err => {
      if (err) {
        return res.status(400).send({
            message: errors.getMessage(err)
          });
      }
      res.json(category);
    });

};


/**
 * Delete an category
 */
function destroy(req, res) {

  Category
    .remove({ _id: req.params.categoryId }, (err, result) => {
      if (err) {
        return res.status(400).send({
            message: errors.getMessage(err)
          });
      }
      res.json(result);
    });

};


/**
 * Get a list of categorys
 */
function all(req, res) {

  Category
    .find()
    .select('-__v')
    .sort('-created')
    .populate('author', 'firstName lastName email')
    .exec((err, categorys) => {
      if (err) {
        return res.status(400).send({
            message: errors.getMessage(err)
          });
      }
      res.json(categorys);
    });

};
