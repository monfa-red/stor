(function() {
  'use strict';

  angular
    .module('storeApp')
    .controller('AppController', AppController)

    .config( function($locationProvider) {
      $locationProvider.html5Mode(true);
    })


    AppController.$inject = ['$router']

    function AppController($router) {
      $router.config([
        { path: '/',         component: 'home' },
        { path: '/ass',      component: 'ass' },
        { path: '/products', component: 'products' },
        { path: '/admin',     component: 'admin'}
      ]);
    }

})()
