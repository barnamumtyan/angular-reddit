/**
 * Created by barni on 12/3/2015.
 */
(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  /*@ngInject*/
  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/r/all');
    $stateProvider
      .state('posts', {
        url:          '/r/:subReddit?sort&time',
        controller:   'Posts',
        controllerAs: 'vm',
        templateUrl:  'src/app/layout/content/posts.html'
      })
      .state('search', {
        url:          '/search/:query',
        controller:   'Posts',
        controllerAs: 'vm',
        templateUrl:  'src/app/layout/content/posts.html'
      });
  }
}());
