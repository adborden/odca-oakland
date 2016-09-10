'use strict';

var _ = require('lodash/core');
var utils = require('../../utils');

function LocalityController ($rootScope, $route, locality, ballot) {
  this.locality = locality;
  this.ballot = ballot;
  this.current_detail = null;

  var self = this;
  var offices = this.offices = [];
  var referendums = this.referendums = [];

  // Find the current ballot_item, if any
  ballot.$promise.then(function (ballot) {
    return findBallotItem($route.current.params.ballot_item_id);
  }).then(function (ballot_item) {
    if (ballot_item) {
      self.current_detail = currentDetailFactory(ballot_item);
    }
  });

  // Listen to route changes to update the ballot_item detail
  $rootScope.$on('$routeUpdate', function (event, next, prev) {
    var ballot_item_id = next.params.ballot_item_id;
    self.current_detail = currentDetailFactory(findBallotItem(ballot_item_id));
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

  // Find a ballot_item_id from the ballot
  function findBallotItem(ballot_item_id) {
    return ballot.ballot_items.find(function (ballot_item) {
      return ballot_item.id === parseInt(ballot_item_id);
    });
  }

  // Factory to create the detail model
  function currentDetailFactory(ballot_item) {
    ballot_item = ballot_item || {};

    return {
      title: ballot_item.name || ballot_item.title
    };
  }
}

function ballot ($route, static_api) {
  return static_api.locality.current_ballot({locality_id: $route.current.params.locality_id});
}

function locality ($route, static_api) {
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
