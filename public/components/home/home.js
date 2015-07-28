angular.module('myApp.home', [])
  .controller('HomeController', [function () {
    this.name = 'Friend';
    this.ass = {
        ass: "ass"
    }
  }]);