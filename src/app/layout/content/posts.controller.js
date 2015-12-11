/**
 * Created by barni on 12/4/2015.
 */
(function() {
  'use strict';

  angular
    .module('layout')
    .controller('Posts', Controller);

  /*@ngInject*/
  function Controller(redditApi, _, $stateParams, $state, spinnerService) {

    var posts = {
      list: []
    };

    var spinner = {
      name:  'postsSpinner',
      group: 'contentSpinners'
    };

    // Export
    _.extend(this, {
      posts:   posts,
      spinner: spinner
    });

    init();

    function init() {
      getPosts().then(onPostsLoaded);
    }

    /**
     * Get posts from browsing or search depending on the ui-router state
     * @returns {Promise} promise of posts array
     */
    function getPosts() {
      var requestParams;
      var source;

      switch ($state.current.name) {
        case 'search':
          requestParams = {
            query: $stateParams.query,
            time:  $stateParams.time
          };
          source = redditApi.getSearchResults;
          break;
        case 'posts':
          requestParams = {
            sub:  $stateParams.subReddit,
            sort: $stateParams.sort,
            time: $stateParams.time
          };
          source = redditApi.getPosts;
          break;
        default:
          requestParams = {};
          source = redditApi.getPosts;
          break;
      }

      return source(requestParams);
    }

    function onPostsLoaded(response) {
      posts.list = response;
      spinnerService.hide(spinner.name);
    }

  }
}());
