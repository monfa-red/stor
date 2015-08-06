(function() {
  'use strict';

  angular

    .module('app')

    .service('HomeService', HomeService)

    .service('GlobalValues', GlobalValues);

  /**
   * Services Constructors
   */

  GlobalValues.$inject = ['$rootScope', 'constants'];

  function GlobalValues($rootScope, constants) {

    this.setPageValues = function(obj) {
      $rootScope.pageName = obj.name || "";
      $rootScope.pageTitle = obj.title || constants.appName;
      $rootScope.pageDescription = obj.description || constants.appDescription;
    }
    
  }

  function HomeService() {

  }
})();
