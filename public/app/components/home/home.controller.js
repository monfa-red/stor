(function() {
  'use strict';

  angular

    .module('app.home')

    .controller('HomeController', HomeController);

    /**
     * Home Controller
     */
    HomeController.$inject = ['GlobalValues'];

    function HomeController(GlobalValues) {

      GlobalValues.setPageValues({
        name: "home",
        title : "Stor Home",
        description: "wwww"
      });

    };

})()
