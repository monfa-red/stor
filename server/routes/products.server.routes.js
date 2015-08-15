var express = require('express');
var router = express.Router();

require('../models/product.server.model.js');
var products = require('../controllers/products.server.controller');


/**
 * TODO:
 * This section has to be removed
 */
var faker = require('faker');

router.get('/list', function(req, res) {
  // var jsonResult = [],
  var jsonResult,
    i;

    // for (i = 0; i < 8; i++) {
      jsonResult = {
        // date: faker.date.past(),
        name: faker.commerce.productName(),
        details: {
          caption: faker.lorem.sentence(),
          description: faker.lorem.paragraph()
        },
        price: {
          retail: faker.random.number() + "99",
          shipping: "1299"
        },
        //TEST: replace it with a user ID
        author: "55ca791ccbd3c480233a3071"
        // imageURLs: ['assets/src/images/product-place-holder-2.png'],
        // sale: faker.random.boolean()
      }
    // )};

  res.json(jsonResult);
});




// Products collection routes
router.route('/')
  .get(products.all)
  .post(products.create);

// Single product routes
router.route('/:productId')
  .get(products.read)
  .put(products.update)
  .delete(products.destroy)


module.exports = router;
