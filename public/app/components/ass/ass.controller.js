(function() {
  'use strict';

  angular

    .module('app.ass')

    .service('myCoolService', function() {
      this.dataIsVis = false;
    })
    // .factory('assentry', function($resource) {
    //   return $resource('/products/list'); // Note the full endpoint address
    // })
    .controller('AssController', AssController)


    .directive('mydir', function() {
      return {
        restrict: 'E',
        // scope: {},
        template: `<p>mydir directive says <b>{{ mydir.name }}</b>
          <button ng-click="mydir.getData()">getData</button>
          <ul>
              <li ng-repeat="list in mydir.list">
                  {{ list.productName }} is <b>$\{{ list.price }}</b>
              </li>
          </ul>
        </p>`,
        controller: function($scope, $http, myCoolService) {
            this.name = "heey!";
            var _this = this;
            this.getData = function() {
              $http
                .get("/products/list")
                .then(function(result) {
                  _this.list = result.data;
                  console.log(result);
                  myCoolService.dataIsVis = true;
                })
            };

            if (myCoolService.dataIsVis) {
              this.getData();
            }
        },
        controllerAs: "mydir"
      }
    });

    AssController.$inject = ['myCoolService', 'GlobalValues'];
    
    function AssController(myCoolService, GlobalValues) {
      this.name = "Abbas";
      
      GlobalValues.setPageValues({
        name: "ASSA",
        title : "ASSA",
        description: "ASSA"
      })

      this.sayHello = function(){
        alert(this.name)
      }
      // $rootScope.title = "ASSSS"
    }


})()
