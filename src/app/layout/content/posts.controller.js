/**
 * Created by barni on 12/4/2015.
 */
(function() {
  'use strict';

  angular
    .module('layout')
    .controller('Posts', Controller);

  /*@ngInject*/
  function Controller(redditApi, _, pubsub, $scope, $stateParams) {

    var subReddit = $stateParams.subReddit;
    var posts = {
      list:     [],
      isLoaded: false
    };

    // Export
    _.extend(this, {
      posts: posts
    });

    init();

    function init() {

      redditApi.getPosts({ sub: subReddit }).then(function(response) {
        posts.list = response;
        posts.isLoaded = true;
      });
    }

  }
}());
