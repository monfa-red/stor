var app = angular.module('myApp.ass', []);

app.controller('AssController', function () {
    this.name = "Abbas";
    this.sayHello = function(){
      alert(this.name)
    }
})
app.directive('mydir', function() {
    return {
        restrict: 'E',
        template: "<p>mydir directive says <b>{{mydir.name}}</b></p>",
        controller: function() {
            this.name = "heey!";
            console.log("mydir directive is working :D")
        },
        controllerAs: "mydir"
    }
});