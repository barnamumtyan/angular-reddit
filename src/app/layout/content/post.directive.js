/**
 * Created by barni on 12/9/2015.
 */
(function () {
  'use strict';

  angular.module('layout')
    .directive('arPost', directive)
    .filter('toLocal', toLocal);

  function directive(LAYOUT_PATH) {
    return {
      restrict:         'E',
      controller:       Controller,
      controllerAs:     'vm',
      templateUrl:      LAYOUT_PATH + 'content/post.html',
      replace:          true,
      scope:            {},
      bindToController: {
        post: '='
      }
    };
  }

  /*@ngInject*/
  function Controller(_, $window) {
    _.extend(this, {
      goToExternalLink: goToExternalLink
    });

    function goToExternalLink(url) {
      $window.open(url, '_blank');
    }
  }

  function toLocal() {
    return function (input) {
      var d = new Date(0);
      d.setUTCSeconds(input);
      return d;
    };
  }
}());
