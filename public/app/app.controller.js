(function() {
  'use strict';

  angular

    .module('app')
    
    .controller('AppController', AppController)

    .config( function($locationProvider, $componentLoaderProvider) {
      
      $locationProvider.html5Mode(true);

      $componentLoaderProvider.setTemplateMapping(function (name) {
          return './app/components/' + name + '/' + name + '.html';
      });
    })


    AppController.$inject = ['$router']

    function AppController($router) {
      $router.config([
        { path: '/',        component: 'home' },
        { path: '/ass',     component: 'ass' },
        { path: '/product', component: 'product' }
      ]);
    }

})()
