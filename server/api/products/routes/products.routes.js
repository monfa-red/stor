'use strict';

/**
 * Moudle dependencies
 */
import products from '../controllers/products.controller';
import faker from 'faker';


/**
 * Export product Routes
 */
export default productsRouter;


/**
 *  Assign routes to controllers
 */
function productsRouter(app) {

  //TODO: REMOVE THIS
  fakeUserInitialTests(app);

  // Routes
  app
    .route('/api/products')
      .get(products.index)
      .post(products.create);

  app
    .route('/api/products/:id')
      .get(products.show)
      .put(products.update)
      .delete(products.destroy)

};


/**
 * TODO:
 * This section has to be removed
 */
function fakeUserInitialTests(app) {

  app
    .route('/api/products/list')
      .get(function(req, res) {
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
            author: "55ca791ccbd3c480233a3071",
            category:{
              main: "55d91920203d5c441e0b0bc6",
              all: [
                "55d91920203d5c441e0b0bc6",
                "55d918d5203d5c441e0b0bc4"
              ]
            }
          };
        res.json(jres)
      });

};
