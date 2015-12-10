(function() {
  'use strict';

  angular
    .module('pubsub')
    .factory('pubsub', factory);

  /*@ngInject*/
  function factory($rootScope, _, PSEVENT) {

    return {
      publish:   publish,
      subscribe: subscribe,
      event:     PSEVENT
    };

    function publish(topic, data) {
      if (_.isString(topic)) {
        $rootScope.$emit(topic, data);
      } else {
        throw new TypeError('topic should be a string!');
      }
    }

    function subscribe(topic, callback, options) {
      var handler;

      var opts = options || {};
      opts.once = opts.once || false;

      if (!opts.scope) {
        throw new TypeError('scope should not be undefined!');
      }

      if (!_.isString(topic)) {
        throw new TypeError('topic should be a string!');
      }

      handler = $rootScope.$on(topic, function(event, data) {
        callback(data);
        if (opts.once) {
          handler();
        }
      });
      options.scope.$on('$destroy', handler);
    }
  }
}());
