(function() {
  'use strict';

  angular
    .module('router')
    .provider('routeHelperConfig', config)
    .factory('routeHelper', factory);

  function config() {
    this.config = {
      // These are the properties we need to set
      // $routeProvider: undefined
      docTitle: 'Angular sample',
      // resolveAlways: {ready: function(){ } }
    };

    this.$get = function() {
      return {
        config: this.config
      };
    };
  }

  /*@ngInject*/
  function factory($state, $rootScope, logger, routeHelperConfig) {

    return {
      init: init
    };


    function handleRoutingErrors() {
      $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error) {

          var msg = 'Error with routing';
          logger.warning(msg, [error]);
          $state.go('main');
        });
    }

    function updateDocTitle() {
      $rootScope.$on('$stateChangeSuccess',
        function(event, toState) {
          var title;
          if (toState.pageTitle) {
            title = routeHelperConfig.config.docTitle + ' - ' + (toState.pageTitle || '');
            // data bind to <title> in index/html
            $rootScope.title = title;
          }
        });
    }

    function init() {
      handleRoutingErrors();
      updateDocTitle();
    }
  }
}());
