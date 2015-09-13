(function() {
  'use strict';

  angular

    .module('app.productList')

    .controller('ProductListController', ProductListController);


    /**
     * Inject Services
     */
    ProductListController.$inject = [
      '$routeParams',
      'InitService',
      'Products',
      'dashify'
      ]

    function ProductListController($routeParams, InitService, Products, dashify) {

      // var _this = this;

      InitService('productList');


      this.products = Products.query();


    }


})()
