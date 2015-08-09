var express = require('express');
var router = express.Router();

require('../models/product.server.model.js');
var products = require('../controllers/products.server.controller');



var faker = require('faker');

router.get('/list', function(req, res) {
  var jsonResult = [],
    i;

    for (i = 0; i < 8; i++) {
      jsonResult.push({
        // date: faker.date.past(),
        name: faker.commerce.productName(),
        caption: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        price: faker.random.number() + "00",
        imageURLs: ['assets/src/imgaes/product-place-holder-2.png'],
        sale: faker.random.boolean()
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
