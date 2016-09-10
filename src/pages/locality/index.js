'use strict';

var _ = require('lodash/core');
var utils = require('../../utils');

function LocalityController ($interpolate, $rootScope, $route, locality, ballot) {
  'ngInject';

  this.locality = locality;
  this.ballot = ballot;
  this.ballot_item = {};

  var self = this;
  var offices = this.offices = [];
  var referendums = this.referendums = [];

  // Find the current ballot_item, if any
  ballot.$promise.then(function () {
    return findBallotItem($route.current.params);
  }).then(function (ballot_item) {
    self.ballot_item = ballot_item;
  });

  // Listen to route changes to update the ballot_item detail
  $rootScope.$on('$routeUpdate', function (event, next) {
    self.ballot_item = findBallotItem(next.params);
  });

  // Sort ballot_items into offices/referendums
  ballot.$promise.then(function (ballot) {
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

    return ballot.ballot_items.find(function (ballot_item) {
      return ballot_item.id === parseInt(ballot_item_id) && ballot_item.contest_type == contest_type;
    });
  }
}

function ballot ($route, static_api) {
  'ngInject';
  return static_api.locality.current_ballot({locality_id: $route.current.params.locality_id});
}

function locality ($route, static_api) {
  'ngInject';
  return static_api.locality.get({locality_id: $route.current.params.locality_id});
}

module.exports = utils.route({
  template: require('./locality.html'),
  controller: LocalityController,
  reloadOnSearch: false,
  resolve: {
    ballot: ballot,
    locality: locality
  }
});
