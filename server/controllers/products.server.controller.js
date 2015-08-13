'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Product = mongoose.model('Product'),
  errorHandler = require('../controllers/errors.server.controller');

/**
 * Create a product
 */

module.exports = {

  create: function (req, res) {
    var product = new Product(req.body);

    // console.log(req)
    // console.log(req.body)
    // TODO: Product authour needs to be set
    // product.user = req.user;

    product.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(product);
      }
    });
  },

  /**
   * Show the current product
   */
  read: function (req, res) {
    // res.json(req.params.productId);
    Product
      .findOne({ 'dashName': req.params.productId })
      .exec(function (err, product) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json(product);
        }
      });
    // console.log(req.params.productId)
  },

  /**
   * Update a product
   */
  update: function (req, res) {
    var product = req.product;

    product.title = req.body.title;
    product.content = req.body.content;

    product.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(product);
      }
    });
  },

  /**
   * TODO: definitly change this!
   * Delete an product
   */
  delete: function (req, res) {
    // var product = req.product;
    // var product = req.params.productId;
    // console.log(product)

    Product.remove({ _id: req.params.productId }, function (err, result) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(result);
      }
    });
  },

  /**
   * List of Articles
   */
  // TODO: .populate('user', 'displayName')

  list: function (req, res) {
    Product.find().sort('-created').exec(function (err, products) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(products);
      }
    });
  },

  /**
   * Product middleware
   */
  productByID: function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: 'Product is invalid'
      });
    }

    Product.findById(id).populate('user', 'displayName').exec(function (err, product) {
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
  }

}
