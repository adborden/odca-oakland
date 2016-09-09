'use strict';

var angular = require('angular');

angular.module('common', [])
  .filter('default', function () {
    return defaultFilter;

    function defaultFilter (value, _default) {
      if (!value) {
        return _default;
      }

      return value;
    }
  });

module.exports = 'common';
