(function() {
  'use strict';

  angular

    .module('app.productDetail')

    .controller('ProductDetailController', ProductDetailController);


  ProductDetailController.$inject = [
    '$routeParams'
  ];

  function ProductDetailController($routeParams) {
    this.productId = $routeParams.productId;
  }

})()
