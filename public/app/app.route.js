(function() {
  'use strict';

  angular

    .module('app')

    .run(appRouter)

    .config(appRouterConfig);


    appRouter.$inject = ['$router', '$rootScope', '$location'];

    /**
     * Router configure management
     */
    function appRouter($router, $rootScope, $location, $scope) {
      $router
        .config([
          { path: '/',                    component: 'home'},
          { path: '/ass',                 component: 'ass' },
          { path: '/products',            component: 'productList' },
          { path: '/products/:productId', component: 'productDetail' },
        ]);
        // $rootScope.$on("$locationChangeSuccess", function(event, current) {
        //     console.log($rootScope);
        //     console.log($location);
        //     $rootScope.title = $location.path();
        //     $rootScope.pageName = $location.path();
        // })
      //   console.log($rootScope.$on);
      //   $rootScope.$on('$routeChangeStart', function (event, current, previous) {
      //     console.log('dd');
      //     // $rootScope.title = current.$$route.title;
      // });
    };


    appRouterConfig.$inject = [
      '$locationProvider',
      '$componentLoaderProvider'
    ];

    /**
     * Set router configurations
     */
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
