var app = angular.module("m-test", []);


app.directive("myApp", function() {
  return {
    restrict: "A",
    link: function() {
      console.log('working')
    }
  }
});

app.directive("test", function() {
  return function (scope, el, attr) {
    console.log("scope: ", scope);
    console.log("el: ", el);
    console.log("attr: ", attr);
  }
})
