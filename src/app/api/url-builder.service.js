/**
 * Created by barni on 12/7/2015.
 */
(function() {
  'use strict';

  angular.module('api')
    .factory('urlBuilder', factory);

  /*@ngInject*/
  function factory(_, $location) {

    var service = {
      build: build
    };
    return service;

    /**
     * Build the base Url string eg.: 'http://reddit.com/r/all.json'
     * @param {string} host of the service
     * @param {array<string>} route for the resource
     * @returns {string} base url string
     */
    function build(host, route) {
      // serialize the route array;
      var routeString = '/' + route.join('/');
      // add protocol, it can differ when running on localhost or on a server
      var baseUrl = $location.protocol() + '://' + host;
      // add the route
      baseUrl += routeString;
      // jsonify the reddit request
      baseUrl += '.json';
      return baseUrl;
    }
  }
}());
