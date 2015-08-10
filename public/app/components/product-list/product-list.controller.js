(function() {
  'use strict';

  angular

    .module('app.productList')

    .controller('ProductListController', ProductListController);


    /**
     * Inject Services
     */
    ProductListController.$inject = [
      'GlobalValues',
      'Products',
      'dashify'
      ]

    function ProductListController(GlobalValues, Products, dashify) {

      // var _this = this;

      // Set the page title
      GlobalValues
        .setPageValues({
          name: "product-list",
          title : "Product List",
          description: "The list of products"
        });


      this.products = Products.query();


    }


})()
