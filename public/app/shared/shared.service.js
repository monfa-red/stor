(function() {
  'use strict';

  angular

    .module('app')

    .factory('InitService', InitService)

    .factory('Products', Products)

    .factory('dashify', dashify);



  /**
   * Services
   */




  /**
   * Init Factory
   * Set up the page title and className;
   */

  InitService.$inject = [ '$rootScope', 'G' ];

  function InitService( $rootScope, G ) {

    return function( page ) {

      // check if an object is passed
      if ( page && typeof page == 'string'  ) {
        page = G[page];
      } else if ( !page || !(page instanceof Object) ) {
        console.log('InitService gets an String or Object')
      }

      $rootScope.pageConfig = {
        id : page.id || G.default.id ,
        title: page.title || G.default.title
      }

    }

  }

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
