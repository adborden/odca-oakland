'use strict';

var _ = require('lodash/core');
var utils = require('../../utils');

function LocalityController (locality, ballot) {
  this.locality = locality;
  this.ballot = ballot;

  var offices = this.offices = [];
  var referendums = this.referendums = [];

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
  resolve: {
    ballot: ballot,
    locality: locality
  }
});
