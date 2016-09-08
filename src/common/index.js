'use strict';

var angular = require('angular');

function defaultFilterFactory () {
  return defaultFilter;

  function defaultFilter (value, _default) {
    if (!value) {
      return _default;
    }

    return value;
  }
}

angular.module('odca')
  .filter('default', defaultFilterFactory);
