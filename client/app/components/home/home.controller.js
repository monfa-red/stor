(function() {
  'use strict';

  angular

    .module('app.home')

    .controller('HomeController', HomeController);

  /**
   * Home Controller
   */
  HomeController.$inject = ['InitService'];

  function HomeController(InitService) {

    InitService('home');


  };


})()
