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
  })
  .filter('url', function (base_url) {
    return urlFilter;

    function urlFilter (path, query) {
      query = query || {};

      // If relative path, prefix it with base_url
      var url = /^https?:\/\//.test(path) ? path : base_url + '/#!' + path;

      var querystring = Object.keys(query).map(function (param) {
        return param + '=' + encodeURIComponent(query[param]);
      }).join('&');

      if (querystring) {
        url = url + '?' + querystring;
      }

      return url;
    }
  });

module.exports = 'common';
