(function() {
  'use strict';

  angular

    .module('app.productList')

    .controller('ProductListController', ProductListController)

    .directive('productNameList', function() {
      return {
        restrict: "E",
        template: `<h5>list of products</h5>
                    <ul>
                      <li ng-repeat="product in productNameList.products">
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
        controllerAs: "productNameList"
      }
    });

    function ProductListController() {

    }




})()
