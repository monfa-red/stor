(function() {
  'use strict';

  angular

    .module('app')

    .run(appRouter)

    .config(appRouterConfig);


    appRouter.$inject = ['$router'];

    function appRouter($router) {

      $router
        .config([
          { path: '/',        component: 'home' },
          { path: '/ass',     component: 'ass' },
          { path: '/product', component: 'product' }
        ]);

    };


    appRouterConfig.$inject = [
      '$locationProvider',
      '$componentLoaderProvider'
    ];

    function appRouterConfig($locationProvider, $componentLoaderProvider) {

      $locationProvider
        .html5Mode(true);

      $componentLoaderProvider
        .setTemplateMapping(function (name) {
          return './app/components/' + name + '/' + name + '.html';
        });

    };

})()
