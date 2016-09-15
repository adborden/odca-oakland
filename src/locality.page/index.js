'use strict';

var angular = require('angular');
var _ = require('lodash/core');
var utils = require('../utils');

angular.module('locality.page', [])
  .component('localityPage', {
    template: require('./locality.html'),
    controller: LocalityController,
    bindings: {
      ballot: '=',
      locality: '='
    }
  });

function LocalityController ($anchorScroll, $interpolate, $rootScope, $route) {
  var ctrl = this;
  ctrl.ballot_item = {};

  var offices = ctrl.offices = [];
  var referendums = ctrl.referendums = [];

  // Find the current ballot_item, if any
  ctrl.ballot.$promise.then(function () {
    return findBallotItem($route.current.params);
  }).then(function (ballot_item) {
    ctrl.ballot_item = ballot_item;
  });

  // Listen to route changes to update the ballot_item detail
  $rootScope.$on('$routeUpdate', function (event, next) {
    ctrl.ballot_item = findBallotItem(next.params);
    $anchorScroll('ballot-content');
  });

  // Sort ballot_items into offices/referendums
  ctrl.ballot.$promise.then(function (ballot) {
    return {
      offices: _(ballot.ballot_items)
        .filter(function (contest) {
          return contest.contest_type == 'Office';
        })
        .sortBy(function (contest) {
          return contest.name;
        })
        .value(),
      referendums: _(ballot.ballot_items)
        .filter(function (contest) {
          return contest.contest_type == 'Referendum';
        })
        .sortBy(function (contest) {
          return contest.number;
        })
        .value()
    };
  }).then(function (contests) {
    utils.array_update(offices, contests.offices);
    utils.array_update(referendums, contests.referendums);
  });

  // Find a ballot_item_id from the ballot based on url parameters, undefined if the ballot_item is not found
  function findBallotItem(params) {
    var ballot_item_id, contest_type;

    // Figure out contest_type based on parameter
    if (params.referendum_id) {
      ballot_item_id = params.referendum_id;
      contest_type = 'Referendum';
    } else {
      ballot_item_id = params.office_id;
      contest_type = 'Office';
    }

    return ctrl.ballot.ballot_items.find(function (ballot_item) {
      return ballot_item.id === parseInt(ballot_item_id) && ballot_item.contest_type == contest_type;
    });
  }
}


module.exports = 'locality.page';
