(function() {
  'use strict';

  angular

    .module('app')

    .service('HomeService', HomeService)

    .service('GlobalValues', GlobalValues);

  /**
   * Services Constructors
   */

  GlobalValues.$inject = ['$rootScope', 'CONSTANTS'];

  function GlobalValues($rootScope, CONSTANTS) {

    this.setPageValues = function(obj) {

      $rootScope.pageValues = {
        pageName : obj.name || "",
        pageTitle: obj.title || CONSTANTS.appName,
        pageDescription: obj.description || CONSTANTS.appDescription
      }
    }

  }

  function HomeService() {

  }
})();
