var app = angular.module('myApp.ass', []);

app.controller('AssController', function () {
    this.name = "Abbas";
    this.sayHello = function(){
      alert(this.name)
    }
})
app.directive('mydir', function() {
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
        controller: function($scope, $http) {
            this.name = "heey!";
            _this = this;
            this.getData = function() {
              $http
                .get("/users/list")
                .success(function(data) {
                  _this.list = data;
                })
            }
            console.log($scope.list);
            console.log($scope);
            console.log("mydir directive is working :D");
            console.log(this)
        },
        controllerAs: "mydir"
    }
});