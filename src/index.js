/* src/js/index.js
 *
 * Add  your custom javascript here. This file is only loaded on the home page
 * unless you add a `javascript` property to your page's front matter.
 **/

'use strict';

var angular = require('angular');
var home = require('./pages/home');


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
            return static_api.current_ballot.get({locality_id: 2}); // Oakland
          }
        }
      });
  });

require('./static');
