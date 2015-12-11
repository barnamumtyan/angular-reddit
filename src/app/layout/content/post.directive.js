/**
 * Created by barni on 12/9/2015.
 */
(function() {
  'use strict';

  angular.module('layout')
    .directive('arPost', directive);

  function directive(LAYOUT_PATH) {
    return {
      restrict:         'E',
      controller:       Controller,
      controllerAs:     'vm',
      templateUrl:      LAYOUT_PATH + 'content/post.html',
      replace:          true,
      bindToController: {
        post: '='
      }
    };
  }

  /*@ngInject*/
  function Controller() {

  }
}());
