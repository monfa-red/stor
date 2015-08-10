(function() {
  'use strict';

  angular

    .module('app.productList')

    .controller('ProductListController', ProductListController);


    /**
     * Inject GlobalValues
     */
    ProductListController.$inject = [
      'GlobalValues',
      '$resource',
      'Products'
      ]

    function ProductListController(GlobalValues, $resource, Products) {

      var _this = this;

      // Set the page title
      GlobalValues
        .setPageValues({
            name: "product-list",
            title : "Product List",
            description: "The list of products"
          });


        // this.products = Products.query();

        this.products = Products.query({
          productId: "55c768425758ade86428bb9d",
          isCool: "yess"
        });


    }


})()
