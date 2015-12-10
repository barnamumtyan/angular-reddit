(function() {
  'use strict';

  angular
    .module('exception')
    .factory('exception', factory);

  /*@ngInject*/
  function factory(logger) {

    return {
      catcher: catcher
    };

    function catcher(message) {
      return function(reason) {
        logger.error(message, reason);
      };
    }
  }
}());
