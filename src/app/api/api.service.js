/**
 * Created by barni on 12/7/2015.
 */
(function() {
  'use strict';

  angular.module('api')
    .factory('redditApi', factory);

  /*@ngInject*/
  function factory(logger, $q, $http, urlBuilder, _, spinnerService) {

    var HOST = 'reddit.com';
    var DEFAULT_SUBREDDIT = 'all';
    var DEFAULT_SORT = 'hot';
    var DEFAULT_TIME = 'day';
    var DEFAULT_COMMENT_LIMIT = 30;
    var DEFAULT_SUBREDDIT_LIMIT = 10;
    var SORT_OPTIONS = ['hot', 'new', 'rising', 'top', 'controversial'];
    var TIME_OPTIONS = ['day', 'week', 'month', 'year'];

    var service = {
      getPosts:         getPosts,
      getPost:          getPost,
      getSearchResults: getSearchResults,
      getSubreddits:    getSubreddits,
      getSubreddit:     getSubreddit,
      getSortOptions:   getSortOptions,
      getTimeOptions:   getTimeOptions

    };
    return service;

    function getSortOptions() {
      return $q(function(resolve) {
        resolve(_.clone(SORT_OPTIONS));
      });
    }

    function getTimeOptions() {
      return $q(function(resolve) {
        resolve(_.clone(TIME_OPTIONS));
      });
    }

    /**
     * Transform the data that the reddit api sends, this is used for the transformResponse option in angular $http
     * @param {Object} data that the reddit json api sends on most request
     * @returns {Array} the data that is used in the app, so you don't have to type ".data.children" on every use
     */
    function dataTransform(data) {
      return data.data.children;
    }

    function getPosts(opts) {
      var route = [
        'r',
        opts.sub || DEFAULT_SUBREDDIT,
        opts.sort || DEFAULT_SORT
      ];

      var params = {
        t:     opts.time || DEFAULT_TIME,
        after: opts.after
      };


      return request(route, params, dataTransform);
    }

    function getPost(opts) {
      var route = [
        'r',
        opts.sub || DEFAULT_SUBREDDIT,
        'comments',
        opts.id
      ];

      var params = {
        limit: opts.limit = DEFAULT_COMMENT_LIMIT
      };

      var transform = function(data) {
        return {
          post:     data[0].data.children[0].data,
          comments: data[1].data.children
        };
      };

      return request(route, params, transform);
    }

    function getSearchResults(opts) {
      var route = [
        'search'
      ];

      var params = {
        q:     opts.query,
        t:     opts.time || DEFAULT_TIME,
        after: opts.after
      };

      return request(route, params, dataTransform);
    }

    function getSubreddits(opts) {
      var route = [
        'subreddits',
        'default'
      ];

      var params = {
        limit: opts.limit || DEFAULT_SUBREDDIT_LIMIT
      };

      return request(route, params, dataTransform);
    }

    function getSubreddit(opts) {
      var route = [
        'r',
        opts.sub || DEFAULT_SUBREDDIT,
        'about'
      ];

      var params = {};

      return request(route, params);
    }

    function request(route, params, transform) {

      var requestOpts;
      var url = urlBuilder.build(HOST, route);

      // add the jsonp parameter since every request is a jsonp request
      params['jsonp'] = 'JSON_CALLBACK';

      requestOpts = {
        method:            'JSONP',
        url:               url,
        params:            params,
        transformResponse: transform
      };

      return $q(function(resolve, reject) {

        $http(requestOpts).then(
          function onSuccess(response) {
            logger.success('Response from: ' + route.join('/'), response);
            resolve(response.data);
          },
          function onError(response) {
            logger.error('response failed from: ' + route.join('/'), response);
            spinnerService.hideGroup('contentSpinners');
            reject();
          }
        );
      });
    }
  }
}());
