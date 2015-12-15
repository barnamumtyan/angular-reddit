(function() {
  'use strict';

  angular.module('layout', ['core', 'api', 'ui.bootstrap', 'ngSanitize', 'RecursionHelper', 'angularMoment', 'markdown'])
    .constant('LAYOUT_PATH', 'src/app/layout/');
}());
