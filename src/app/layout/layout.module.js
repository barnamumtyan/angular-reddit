(function() {
  'use strict';

  angular.module('layout', ['core', 'api', 'ui.bootstrap', 'ngSanitize'])
    .constant('LAYOUT_PATH', 'src/app/layout/');
}());
