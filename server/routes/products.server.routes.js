'use strict';

import '../models/product.server.model';
import products from '../controllers/products.server.controller';
// TODO: remove this
import faker from 'faker';



export default function (app) {

  app.route('/api/products')
    .get(products.all)
    .post(products.create);



/**
 * TODO:
 * This section has to be removed
 */
  app.route('/api/products/list').get(function(req, res) {
    // var jsonResult = [],
    let jres = {
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

      };

    res.json(jres)
  });




  // Single product routes
  app.route('/api/products/:productId')
    .get(products.read)
    .put(products.update)
    .delete(products.destroy)



};
