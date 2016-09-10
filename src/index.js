/* src/js/index.js
 *
 * Add  your custom javascript here. This file is only loaded on the home page
 * unless you add a `javascript` property to your page's front matter.
 **/

'use strict';

var angular = require('angular');

angular.module('odca', [
  require('angular-resource'),
  require('angular-route'),
  require('./common'),
  require('./static'),
  require('./candidates'),
  require('./detail_panel')
])
  .constant('base_url', '/odca-oakland')
  .config(function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(false).hashPrefix('!');
    $routeProvider
      .when('/', require('./pages/home'))
      .when('/candidate/:candidate_id', require('./pages/candidate'))
      .when('/locality/:locality_id', require('./pages/locality'));
  });
