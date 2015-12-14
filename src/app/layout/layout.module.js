(function() {
  'use strict';

  angular.module('layout', ['core', 'api', 'ui.bootstrap', 'ngSanitize', 'RecursionHelper', 'angularMoment'])
    .constant('LAYOUT_PATH', 'src/app/layout/');
}());
