var express = require('express');
var router = express.Router();

require('../models/product.server.model.js');
var products = require('../controllers/products.server.controller');



var faker = require('faker');

router.get('/list', function(req, res) {
  var jsonResult = [],
    i;

    for (i = 0; i < 10; i++) {
      jsonResult.push({
        date: faker.date.past(),
        productName: faker.commerce.productName(),
        price: faker.commerce.price(),
        productShortDesc: faker.lorem.sentence(),
        productFullDesc: faker.lorem.paragraph(),
        imageUrl: 'http://lorempixel.com/300/260/'
      });
    };

  res.json(jsonResult);
});




  // Products collection routes
  router.route('/')
    .get(products.list)
    .post(products.create);

  // Single product routes
  router.route('/:productId')
    .get(products.read)
    .put(products.update)
    .delete(products.delete);


// Remove this block
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Products!' });
// });


module.exports = router;
