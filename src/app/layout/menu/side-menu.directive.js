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
  function Controller(pubsub, $scope, _, redditApi, $state, $stateParams) {

    var sideMenu = {
      isOpen: false
    };

    var subReddits = {
      select: selectSubreddit
    };

    var sort = {
      select: selectSort
    };

    var time = {
      select: selectTime
    };

    // export
    _.extend(this, {
      sideMenu:   sideMenu,
      subReddits: subReddits,
      sort:       sort,
      time:       time
    });

    init();

    function init() {

      pubsub.subscribe(pubsub.event.SIDEMENU_TOGGLE, onSideMenuToggle, { scope: $scope });

      redditApi.getSubreddits({ limit: 10 }).then(function(response) {
        subReddits.list = response;
      });

      redditApi.getSortOptions().then(function(response) {
        sort.list = response;
      });

      redditApi.getTimeOptions().then(function(response) {
        time.list = response;
      });
    }

    function onSideMenuToggle(isMenuOpen) {
      sideMenu.isOpen = isMenuOpen;
    }

    function selectSubreddit(selectedSubReddit) {
      goTo({ subReddit: selectedSubReddit.display_name });
    }

    function selectSort(selectedSort) {
      goTo({ sort: selectedSort });
    }

    function selectTime(selectedTime) {
      goTo({ time: selectedTime });
    }

    function goTo(opts) {
      //default values from stateParams if not set
      opts.sort = opts.sort || $stateParams.sort;
      opts.time = opts.time || $stateParams.time;
      opts.subReddit = opts.subReddit || $stateParams.subReddit;

      $state.go('posts', { subReddit: opts.subReddit, sort: opts.sort, time: opts.time });
    }
  }
}());
