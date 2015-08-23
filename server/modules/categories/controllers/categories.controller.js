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
module.exports = {

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
    .sort('-created')
    .exec((err, categorys) => {
      if (err) {
        return res.status(400).send({
            message: errors.getMessage(err)
          });
      }
      res.json(categorys);
    });

};


/**
 * Category middleware
 */
function categoryByID(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
        message: 'Category is invalid'
      });
  }

  Category
    .findById(id)
    .populate('user', 'displayName')
    .exec((err, category) => {
        if (err) {
          return next(err);
        } else if (!category) {
          return res.status(404).send({
              message: 'No category with that identifier has been found'
            });
        }
      req.category = category;
      next();
    });

};
