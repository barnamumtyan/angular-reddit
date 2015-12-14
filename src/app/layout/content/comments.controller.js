/**
 * Created by barni on 12/11/2015.
 */
(function() {
  'use strict';

  angular.module('layout')
    .controller('Comments', Controller);

  /*@ngInject*/
  function Controller(redditApi, $stateParams, _, spinnerService) {

    var post = {
      comments: [],
      data:     []
    };

    var spinner = {
      name:  'commentSpinner',
      group: 'contentSpinners'
    };

    // export
    _.extend(this, {
      post:    post,
      spinner: spinner
    });

    init();

    function init() {
      redditApi.getPost({ sub: $stateParams.subReddit, id: $stateParams.id }).then(onCommentsLoaded);
    }

    function onCommentsLoaded(response) {
      post.comments = response.comments;
      post.data = response.post;
      spinnerService.hide(spinner.name);
    }

  }
}());
