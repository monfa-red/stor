'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';


/**
 * Get the Payment model
 */
let Payment = mongoose.model('Payment');



/**
 * Export payment controllers
 */
export default {

  index,

  create,

  show,

  update,

  destroy

};


/**
 * Get a list of payments
 */
function index(req, res, next) {

  Payment
    .find()
    .select('-__v')
    .sort('-created')
    .populate('address', '-__v')
    .exec((err, payments) => {
      if (err) return next(err);
      res.json(payments);
    });

};


/**
 * Create and save a payment
 */
function create(req, res, next) {

  let payment = new Payment(req.body);

  payment
    .save(err => {
      if (err) return next(err);
      res.json(payment);
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
