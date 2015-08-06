(function() {
  'use strict';

  angular

    .module('app')

    .run(appRouter)

    .config(appRouterConfig);


    /**
     * Router configure management
     */
    appRouter.$inject = ['$router'];

    function appRouter($router) {
      $router
        .config([
          { path: '/',                    component: 'home'},
          { path: '/ass',                 component: 'ass' },
          { path: '/products',            component: 'productList' },
          { path: '/products/:productId', component: 'productDetail' },
        ]);
        // $rootScope.$on("$locationChangeSuccess", function(event, current) {
        //     $rootScope.title = $location.path();
        // })
    };


    /**
     * Set router configurations
     */
    appRouterConfig.$inject = [
        '$locationProvider',
        '$componentLoaderProvider'
      ];

    function appRouterConfig($locationProvider, $componentLoaderProvider) {

      /**
       * Convert CameCase component names to dash-case
       */
      function dashCase(str) {

        // Make sure the first letter is lowerCase
        str = str[0].toLowerCase() + str.slice(1);

        return str.replace(/([A-Z])/g, function ($1) {
          return '-' + $1.toLowerCase();
        });

      }

      /**
       * Enable HTML5 routing
       */
      $locationProvider
        .html5Mode(true);

      /**
       * Set the default ./components folder to  ./app/components
       */
      $componentLoaderProvider
        .setTemplateMapping(function (name) {
          var dashName = dashCase(name);
          return './app/components/' + dashName + '/' + dashName + '.html';
        });

    };


})()
