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
export default {

  create,

  show,

  update,

  destroy,

  index

};

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/xxx              ->  index
 * POST    /api/xxx              ->  create
 * GET     /api/xxx/:id          ->  show
 * PUT     /api/xxx/:id          ->  update
 * DELETE  /api/xxx/:id          ->  destroy
 */


 /**
  * Get a paginated list of products
  */
function index(req, res, next) {

  let limit = Math.abs(req.query.limit) || 16;
  let page = (Math.abs(req.query.page) || 1) - 1;

  Product
    .find()
    .exists('active')
    .limit(limit)
    .skip(limit * page)
    .select('-__v -categories -details -author -category.all')
    .sort('-created')
    .populate('category.main', 'name nameId')
    .exec((err, products) => {
      if (err) return next(err);
      res.json(products);
    });

};


/**
 * Create and save a product
 */
function create(req, res, next) {

  let product = new Product(req.body);

  product
    .save(err => {
      if (err) return next(err);
      res.json(product);
    })

};


/**
 * Find a product by "nameId"
 */
function show(req, res, next) {

  let id = req.params.id;

  Product
    .findOne({ 'nameId': id })
    .exists('active')
    .select('-__v')
    .sort('-created')
    .populate('author', 'name profileImage')
    .populate('category', '-_id')
    .exec((err, product) => {
      if (err) return next(err);
      if (!product) {
        return res.status(404).send({
          message: `Product ${id} does not exists`
        });
      }
      res.json(product);
    });

};


/**
 * Update a product
 */
function update(req, res, next) {

  let product = req.body;
  product.title = req.body.title;
  product.content = req.body.content;

  product
    .save()
    .exec((err, product) => {
      if (err) return next(err);
      res.json(product);
    });

};


/**
 * Delete a product
 */
function destroy(req, res, next) {

  Product
    .removeById(req.params.id)
    .exec((err, result) => {
      if (err) return next(err);
      res.json(result);
    });

};


/**
 * Product middleware
 */
function productByID(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
        message: 'Invalid product identifier'
      });
  }

  Product
    .findById(id)
    .populate('author', 'name profileImage')
    .exec((err, product) => {
      if (err) return next(err);
      if (!product) {
        return res.status(404).send({
          message: `Product ${id} does not exists`
        });
      }
      req.product = product;
      next();
    });

};
