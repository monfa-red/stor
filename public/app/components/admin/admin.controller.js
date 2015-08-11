(function() {
  'use strict';

  angular

    .module('app.admin')

    .controller('AdminController', AdminController);


  /**
   * Admin Controller
   */
  AdminController.$inject = ['InitService'];

  function AdminController(InitService) {

    InitService('admin')

    this.test = "msg from Admin Controller"
    
  };


})();
