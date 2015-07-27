var app = angular.module("m-test", ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    template: "<h6>Root!</h6>"
  })
  .when("/a", {
    template: "<h6>Uers page :P</h6>"
  })
  .otherwise({
    template: "404 my error"
  })
})


// app.controller("appCtrl", function ($scope) {
//   this.say = function(msg) {
//     alert(msg);
//   };
//   return $scope.appCtrl = this;
// })

// app.directive("myApp", function() {
//   return {
//     restrict: "A",
//     link: function() {
//       console.log('working')
//     }
//   }
// });

// app.directive("test", function() {
//   return function (scope, el, attr) {
//     console.log("scope: ", scope);
//     console.log("el: ", el);
//     console.log("attr: ", attr);
//   }
// })
