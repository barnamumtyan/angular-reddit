/**
 * Created by barni on 12/8/2015.
 */
(function() {
  'use strict';

  angular.module('layout')
    .directive('arSideMenu', directive);

  /*@ngInject*/
  function directive(LAYOUT_PATH) {
    return {
      restrict:     'E',
      controller:   Controller,
      controllerAs: 'vm',
      templateUrl:  LAYOUT_PATH + 'menu/side-menu.html',
      replace:      true,
      scope:        {}

    };
  }

  /*@ngInject*/
  function Controller(pubsub, $scope, _, redditApi, $state) {

    var sideMenu = {
      isOpen: false
    };

    var subReddits = {
      list:   [],
      select: selectSubreddit
    };

    // export
    _.extend(this, {
      sideMenu:   sideMenu,
      subReddits: subReddits
    });

    init();

    function init() {

      pubsub.subscribe(pubsub.event.SIDEMENU_TOGGLE, onSideMenuToggle, { scope: $scope });

      redditApi.getSubreddits({ limit: 10 }).then(function(response) {
        console.log(response);
        subReddits.list = response;
      });
    }

    function onSideMenuToggle(isMenuOpen) {
      sideMenu.isOpen = isMenuOpen;
    }

    function selectSubreddit(subReddit) {
      $state.go('posts', { subReddit: subReddit.display_name });
    }

    function selectSort() {

    }

    function selectTime() {

    }
  }
}());
