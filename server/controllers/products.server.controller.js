'use strict';

/**
 * Module dependencies
 */

var mongoose = require('mongoose'),
  Product = mongoose.model('Product'),
  errorHandler = require('../controllers/errors.server.controller');


/**
 * A list of all Exported methods
 */

module.exports = {

  create: create,

  read: read,

  update: update,

  destroy: destroy,

  all: all

};


/**
 * Create a product
 */

function create(req, res) {

  var product = new Product(req.body);

  product
    .save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
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
    .exec(function (err, product) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
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
    .save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.json(product);
    });

};



/**
 * TODO:
 * Delete an product
 */

function destroy(req, res) {

  Product
    .remove({ _id: req.params.productId }, function (err, result) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
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
    .exec(function (err, products) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
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
    .exec(function (err, product) {
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
