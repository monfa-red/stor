'use strict';

/**
 * Moudle dependencies
 */
import faker from 'faker';
import products from '../controllers/products.controller';
import auth from '../../../core/auth/services/auth.service';


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
      // .post(auth.admin, products.create);

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
            name: faker.commerce.productName(),
            details: {
              caption: faker.lorem.sentence(),
              description: faker.lorem.paragraph()
            },
            price: {
              retail: faker.random.number() + "99",
              shipping: "1299"
            },
            images: {
              small: ['assets/images/product-place-holder.png']
            },
            author: "55faaa0d987b7559175fc751", //works
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
