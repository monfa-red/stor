(function() {
  'use strict';

  angular

    .module('app.ass')

    .service('myCoolService', function() {
      this.dataIsVis = false;
    })
    .controller('AssController', function(myCoolService) {
      this.name = "Abbas";
      // $scope.dataVisible = false;
      console.log(myCoolService);
      this.sayHello = function(){
        alert(this.name)
      }
    })

    .directive('mydir', function() {
      return {
        restrict: 'E',
        // scope: {},
        template: `<p>mydir directive says <b>{{ mydir.name }}</b>
          <button ng-click="mydir.getData()">getData</button>
          <ul>
              <li ng-repeat="list in mydir.list">
                  {{ list.email }} is from {{ list.firstName }}
              </li>
          </ul>
        </p>`,
        controller: function($scope, $http, myCoolService) {
            this.name = "heey!";
            var _this = this;
            this.getData = function() {
              $http
                .get("/users/list")
                .then(function(data) {
                  _this.list = data;
                  myCoolService.dataIsVis = true;
                })
            }
            if (myCoolService.dataIsVis) {
              this.getData();
            }
            console.log($scope.list);
            console.log($scope);
            console.log("mydir directive is working :D");
            console.log(this)
        },
        controllerAs: "mydir"
      }
    });


})()



