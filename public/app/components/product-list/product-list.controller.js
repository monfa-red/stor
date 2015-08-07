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
            name: "ass",
            title : "Ass Page",
            description: "Ass description"
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
