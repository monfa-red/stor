'use strict';

/**
 * Module dependencies
 */
import mongoose from 'mongoose';


/**
 * Get the Address model
 */
let Address = mongoose.model('Address');



/**
 * Export address controllers
 */
export default {

  index,

  create,

  show,

  update,

  destroy

};


/**
 * Get a list of addresses
 */
function index(req, res, next) {

  Address
    .find()
    .select('-__v')
    .sort('-created')
    .populate('address', '-__v')
    .exec((err, addresses) => {
      if (err) return next(err);
      res.json(addresses);
    });

};


/**
 * Create and save a address
 */
function create(req, res, next) {

  let address = new Address(req.body);

  address
    .save(err => {
      if (err) return next(err);
      res.json(address);
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
