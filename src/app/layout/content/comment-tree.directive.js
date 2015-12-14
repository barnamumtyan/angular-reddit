/**
 * Created by barni on 12/12/2015.
 */
(function() {
  'use strict';

  angular.module('layout')
    .directive('commentTree', directive);

  /*@ngInject*/
  function directive(LAYOUT_PATH, RecursionHelper) {
    return {
      restrict:         'E',
      controller:       Controller,
      controllerAs:     'vm',
      templateUrl:      LAYOUT_PATH + 'content/comment-tree.html',
      compile:          compile,
      bindToController: {
        comment: '='
      }
    };
    /*@ngInject*/
    function Controller() {
      console.log(this);
    }

    function compile(element) {
      return RecursionHelper.compile(element);
    }
  }
}());
