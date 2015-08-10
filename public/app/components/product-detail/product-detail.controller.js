(function() {
  'use strict';

  angular

    .module('app.productDetail')

    .controller('ProductDetailController', ProductDetailController);


  ProductDetailController.$inject = [
    '$routeParams',
    'GlobalValues',
    'Products',
    'dashify'
  ];

  function ProductDetailController($routeParams,GlobalValues, Products, dashify) {

    var _this = this;

    console.log(_this);

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
      console.log(result);

      GlobalValues
        .setPageValues({
          name: $routeParams.productId,
          title : result.name,
          description: "product description"
        });

    };


    function ProductLoadErorr(err) {
      console.log('An error happend while loading data:', err)
    }


  }

})()
