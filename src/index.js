/* src/js/index.js
 *
 * Add  your custom javascript here. This file is only loaded on the home page
 * unless you add a `javascript` property to your page's front matter.
 **/

'use strict';

var angular = require('angular');
var home = require('./pages/home');
var candidate = require('./pages/candidate');
var utils = require('./utils');


angular.module('odca', [
  require('angular-resource'),
  require('angular-route')
])
  .constant('base_url', '/odca-oakland')
  .config(function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(false).hashPrefix('!');
    $routeProvider
      .when('/', {
        template: home.template,
        controller: home.controller,
        controllerAs: 'vm',
        resolve: {
          ballot: function (static_api) {
            return static_api.locality.current_ballot({locality_id: 2}); // Oakland
          }
        }
      })
      .when('/candidate/:candidate_id', {
        template: candidate.template,
        controller: candidate.controller,
        controllerAs: 'vm',
        resolve: {
          candidate: function ($route, static_api) {
            return static_api.candidate.get({candidate_id: $route.current.params.candidate_id});
          },
          opposing: function ($route, static_api) {
            return static_api.candidate.opposing({candidate_id: $route.current.params.candidate_id});
          },
          supporting: function ($route, static_api) {
            return static_api.candidate.supporting({candidate_id: $route.current.params.candidate_id});
          }
        }
      })
      .when('/locality/:locality_id', require('./pages/locality'));
  });

require('./common');
require('./static');
