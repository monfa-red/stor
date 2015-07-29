angular

  .module('storeApp', [
    'ngNewRouter',
    'storeApp.products',
    'storeApp.home',
    'storeApp.ass'
  ])

  .controller('AppController', [
    '$router',
    AppController
  ])

  .config( function($locationProvider) {
    $locationProvider.html5Mode(true);
  })


  function AppController($router) {
    $router.config([
      { path: '/',         component: 'home' },
      { path: '/ass',      component: 'ass' },
      { path: '/products', component: 'products' }
    ]);
  }



// app.directive("storeApp", function() {
//   return {
//     restrict: "A",
//     link: function() {
//       console.log('working')
//     }
//   }
// });

// app.directive("test", function() {
//   return function (scope, el, attr) {
//     console.log("scope: ", scope);
//     console.log("el: ", el);
//     console.log("attr: ", attr);
//   }
// })
