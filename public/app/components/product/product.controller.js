(function() {
  'use strict';

  angular

    .module('app.product')

    .service('app.productService', function() {
      this.working = "Yes!"
    })

    .controller('ProductsController', ProductsController)

    .directive('productList', function() {
      return {
        restrict: "E",
        template: `<h5>list of products</h5>
                    <ul>
                      <li ng-repeat="product in productList.products">
                        <h6>{{ product.title }}</h6>
                        <p>{{ product.name }}</p>        
                      </li>
                    </ul>`,
        controller: function() {
          this.products = [{
            title: "testTitle",
            name: "tastName"
          }];
          console.log(this.products);
        },
        controllerAs: "productList"
      }
    });

    function ProductsController() {

    }




})()
