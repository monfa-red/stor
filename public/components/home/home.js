angular

  .module('storeApp.home', [])

  .controller('HomeController', HomeController)

  .directive('hero', heroDirective);



function heroDirective() {
    return {
      restrict: "E",
      templateUrl: "./components/home/hero/hero.html",
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