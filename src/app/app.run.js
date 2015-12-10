/**
 * Created by barni on 12/3/2015.
 */
(function() {
  'use strict';

  angular.module('app').run(run);

  run.$inject = ['routeHelper'];
  function run(routeHelper) {
    routeHelper.init();
  }
}());
