(function() {
  'use strict';

  angular
    .module('logger')
    .factory('logger', factory);

  /*@ngInject*/
  function factory($log) {

    return {
      error:   error,
      info:    info,
      success: success,
      warning: warning
    };

    function error(message, data) {
      $log.error('Error: ' + message + '\nDetails: ', data);
    }

    function info(message, data) {
      $log.info('Info: ' + message + '\nDetails: ', data);
    }

    function success(message, data) {
      $log.info('Success: ' + message + '\nDetails: ', data);
    }

    function warning(message, data) {
      $log.warn('Warning: ' + message + '\nDetails: ', data);
    }
  }
}());
