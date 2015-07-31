(function() {
  'use strict';

  angular

    .module('app.home')

    .controller('HomeController', HomeController)

    .directive('hero', heroDirective);


    function heroDirective() {
      return {
        restrict: "E",
        // templateUrl: "{{ hero.msg }}",
        controller: function() {
          this.msg = "heroo"
        },
        controllerAs: "hero"
      }
    };

    function HomeController($window) {
      $window.document.title = "Home :)"
      this.name = 'Friend';
    };

})()