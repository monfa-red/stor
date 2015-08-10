(function() {
  'use strict';

  angular

    .module('app')

    .service('GlobalValues', GlobalValues)

    .factory('Products', Products)

    .factory('dashify', dashify);



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
      };

    }

  };

  /**
   * Products Factory
   */
  Products.$inject = ['$resource'];

  function Products($resource) {

    return $resource('/api/products/:productId', {
      productId:'@_id'
    }, {
      update: {
        method:'PUT'
      }
    })

  };

  /**
   * Trim and Dashify a String
   */
  function dashify() {

    return function(str) {
      return str.trim().replace(/\s+/g, '-').toLowerCase();
    }

  };


})();
