var app = angular.module('myApp.ass', []);

// app.directive('myDir', function() {
//     return {
//         restrict: 'E',
//         template: "<h5>assssssss {{a.name}}</h5>",
//         controller: function() {
//             this.name = "AssAA"
//         },
//         controllerAs: "a"
//     }
// });
app.controller('AssController', function () {
    this.name = "Abbas";
})


// angular.module('myApp.ass', [])
//   .controller('AssController', [function () {
//     this.name = 'Abbas';
//   }]);


// app.directive('mydirect', function() {
//     return {
//         restrict: 'E',
//         controller: function() {

//         }
//     }
// })