(function() {
  'use strict';

  angular

    .module('app.productList')

    .controller('ProductListController', ProductListController);


    /**
     * Inject GlobalValues 
     */
    ProductListController.$inject = ['GlobalValues']

    function ProductListController(GlobalValues) {

      GlobalValues
        .setPageValues({
            name: "product-list",
            title : "Product List",
            description: "The list of products"
          });
        
      this.products = [
        {
          title: 'First Product'
        },
        {
          title: 'second product'
        },
        {
          title: 'ontoher product'
        },
        {
          title: 'some other stuff'
        },
        {
          title: 'last one'
        },
      ]
    }


})()
