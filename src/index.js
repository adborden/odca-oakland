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
  require('./locality.page'),
  require('./home.page'),
  require('./referendum'),
  require('./committee')
])
  .constant('base_url', '/odca-oakland')
  .config(function ($locationProvider, $routeProvider) {
    'ngInject';

    $locationProvider.html5Mode(false).hashPrefix('!');
    $routeProvider
      .when('/', {
        template: '<home-page></home-page>'
      })
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
      })
      .when('/referendum/:referendum_id/:support_oppose', {
        template: '<referendum-money referendum="$resolve.referendum" money="$resolve.money"></referendum-money>',
        resolve: {
          referendum: function ($route, static_api) {
            return static_api.referendum.get({referendum_id: $route.current.params.referendum_id});
          },
          money: function ($route, static_api) {
            return $route.current.params.support_oppose === 'supporting' ?
              static_api.referendum.supporting({referendum_id: $route.current.params.referendum_id}) :
              static_api.referendum.opposing({referendum_id: $route.current.params.referendum_id});
          }
        }
      })
      .when('/committee/:committee_id', {
        template: '<committee-page committee="$resolve.committee"></committee-page>',
        resolve: {
          committee: function ($route, static_api) {
            return static_api.committee.get({committee_id: $route.current.params.committee_id});
          }
        }
      });
  });
