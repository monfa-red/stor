angular

  .module('storeApp', [
    'ngNewRouter',
    'app.admin',
    'storeApp.products',
    'storeApp.home',
    'storeApp.ass'
  ]);




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
