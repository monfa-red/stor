(function() {
  'use strict';

  angular

    .module('app.productList')

    .service('ProductListService', ProductListService);


    /**
     * Product Servie Constructor
     */
    function ProductListService() {
      this.getProductList = function() {}
    }
})()
