/**
 * Created by barni on 12/4/2015.
 */
(function() {
  'use strict';

  angular.module('layout')
    .directive('arHeader', directive);

  /*@ngInject*/
  function directive(LAYOUT_PATH) {
    return {
      restrict:     'E',
      controller:   Controller,
      controllerAs: 'vm',
      templateUrl:  LAYOUT_PATH + 'header/header.html',
      replace:      true,
      scope:        {}
    };
  }

  /*@ngInject*/
  function Controller(pubsub, _) {

    var sideMenu = {
      isOpen: false,
      toggle: toggleSideMenu
    };


    _.extend(this, {
      sideMenu:  sideMenu,
      subReddit: subReddit
    });

    function toggleSideMenu() {
      sideMenu.isOpen = !sideMenu.isOpen;
      pubsub.publish(pubsub.event.SIDEMENU_TOGGLE, sideMenu.isOpen);
    }
  }
}());
