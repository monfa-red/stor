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
      '$resource'
      ]

    function ProductListController(GlobalValues, $resource) {

      var _this = this;

      // Set the page title
      GlobalValues
        .setPageValues({
            name: "product-list",
            title : "Product List",
            description: "The list of products"
          });

      // API stuff
      this.runSample = function() {

        var User = $resource('/api/products/list/:ass')
          .query();

        this.products = User;

      }

      // this.products = [
      //   {
      //     productName: 'First Product'
      //   },
      //   {
      //     productName: 'second product'
      //   },
      //   {
      //     productName: 'ontoher product'
      //   },
      //   {
      //     productName: 'some other stuff'
      //   },
      //   {
      //     productName: 'last one'
      //   },
      // ]
    }


})()
