(function() {
  'use strict';

  angular

    .module('app')

    .constant('G',
      // var G =
      {
        default: {
          id: 'store',
          title: 'Store'
        },
        home: {
          id: 'home',
          title: 'Stor Home'
        },
        ass: {
          id: 'ass',
          title: 'Ass Page'
        },
        admin: {
          id: 'admin',
          title: 'Admin Page'
        },
        productList: {
          id: 'product-list',
          title: 'Product List'
        }
      }
    );


})();
