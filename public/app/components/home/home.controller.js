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


    HomeController.$inject = ['GlobalValues'];

    function HomeController(GlobalValues) {
      // $window.document.title = "Home :)";
      GlobalValues.setPageValues({
        name: "home",
        title : "Stor Home",
        description: "wwww"
      })
      this.name = 'Friend';
    };

})()
