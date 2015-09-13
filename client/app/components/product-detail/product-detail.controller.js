(function() {
  'use strict';

  angular

    .module('app.productDetail')

    .controller('ProductDetailController', ProductDetailController);


  ProductDetailController.$inject = [
    '$routeParams',
    'InitService',
    'Products',
    'dashify'
  ];

  function ProductDetailController($routeParams, InitService, Products, dashify) {

    var _this = this;

    /**
     * Load Data chain
     */
    Products

      .get({
          productId: $routeParams.productId
        })

      .$promise

      .then(ProductsLoaded)

      .catch(ProductLoadErorr)


    /**
     * After loading data
     */
    function ProductsLoaded(result) {

      _this.product = result;

      InitService({
        id: $routeParams.productId,
        title : result.name,
      })

    };


    function ProductLoadErorr(err) {
      console.log('An error happend while loading data:', err)
    }


  }

})()
