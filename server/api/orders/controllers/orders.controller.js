'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';


/**
 * Get the Order model
 */
let Orders = mongoose.model('Orders');



/**
 * Export order controllers
 */
export default {

  index,

  create,

  show,

  update,

  destroy

};


/**
 * Get a list of orders
 */
function index(req, res, next) {

  Order
    .find()
    .select('-__v')
    .sort('-created')
    .populate('address', '-__v')
    .exec((err, orders) => {
      if (err) return next(err);
      res.json(orders);
    });

};


/**
 * Create and save a order
 */
function create(req, res, next) {

  let order = new Order(req.body);

  order
    .save(err => {
      if (err) return next(err);
      res.json(order);
    })

};


/**
 * Find and show a peyment
 */
function show(req, res, next) {

};


/**
 * Update a peyment
 */
function update(req, res, next) {

};


/**
 * Delete a peyment
 */
function destroy(req, res, next) {

};
