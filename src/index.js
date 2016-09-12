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
  require('./money'),
  require('./candidates'),
  require('./ballot_item_detail'),
  require('./candidate.page'),
  require('./locality.page')
])
  .constant('base_url', '/odca-oakland')
  .config(function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(false).hashPrefix('!');
    $routeProvider
      .when('/', require('./pages/home'))
      .when('/candidate/:candidate_id', {
        template: '<candidate-page candidate="$resolve.candidate" opposing="$resolve.opposing" supporting="$resolve.supporting"></candidate-page>',
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
      .when('/locality/:locality_id', {
        template: '<locality-page locality="$resolve.locality" ballot="$resolve.ballot"></locality-page>',
        reloadOnSearch: false,
        resolve: {
          ballot: function ($route, static_api) {
            return static_api.locality.current_ballot({locality_id: $route.current.params.locality_id});
          },
          locality: function ($route, static_api) {
            return static_api.locality.get({locality_id: $route.current.params.locality_id});
          }
        }
      });
  });
