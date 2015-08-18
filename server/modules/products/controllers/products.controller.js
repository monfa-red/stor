'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';
import errors from '../../core/controllers/errors.controller';


/**
 * Get the Product model
 */
let Product = mongoose.model('Product');


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
 * Create and save a product
 */
function create(req, res) {

  var product = new Product(req.body);

  product
    .save(err => {
      if (err) {
        return res.status(400).send({
            message: errors.getMessage(err)
          });
      }
      res.json(product);
    })

};


/**
 * Find a product by "nameId"
 */
function read(req, res) {

  Product
    .findOne({ 'nameId': req.params.productId })
     // TODO: only return necessary data
    .populate('author')
    .exec((err, product) => {
      if (err) {
        return res.status(400).send({
            message: errors.getMessage(err)
          });
      }
      res.json(product);
    });

};


/**
 * Update a product
 */
function update(req, res) {

  var product = req.product;
  product.title = req.body.title;
  product.content = req.body.content;

  product
    .save(err => {
      if (err) {
        return res.status(400).send({
            message: errors.getMessage(err)
          });
      }
      res.json(product);
    });

};


/**
 * Delete an product
 */
function destroy(req, res) {

  Product
    .remove({ _id: req.params.productId }, (err, result) => {
      if (err) {
        return res.status(400).send({
            message: errors.getMessage(err)
          });
      }
      res.json(result);
    });

};


/**
 * Get a list of products
 */
function all(req, res) {

  Product
    .find()
    .sort('-created')
    .exec((err, products) => {
      if (err) {
        return res.status(400).send({
            message: errors.getMessage(err)
          });
      }
      res.json(products);
    });

};


/**
 * Product middleware
 */
function productByID(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
        message: 'Product is invalid'
      });
  }

  Product
    .findById(id)
    .populate('user', 'displayName')
    .exec((err, product) => {
        if (err) {
          return next(err);
        } else if (!product) {
          return res.status(404).send({
              message: 'No product with that identifier has been found'
            });
        }
      req.product = product;
      next();
    });

};