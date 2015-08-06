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

      $rootScope.pageValues = {
        pageName : obj.name || "",
        pageTitle: obj.title || constants.appName,
        pageDescription: obj.description || constants.appDescription
      }
    }

  }

  function HomeService() {

  }
})();
