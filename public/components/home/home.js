angular

  .module('myApp.home', [])

  .controller('HomeController', HomeController);


  function HomeController() {
    this.name = 'Friend';
  }