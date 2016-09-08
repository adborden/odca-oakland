'use strict';

var _ = require('lodash');
var utils = require('../../utils');

function HomeController (ballot) {
  this.ballot = ballot;
  var candidates = this.candidates = [];
  var contests = this.contests = [];
  var offices = this.offices = [];

  ballot.$promise.then(function (ballot) {
    return {
      offices: _(ballot.ballot_items)
        .filter(function (contest) {
          return contest.contest_type == 'Office'
        })
        .value(),
      referendums: _(ballot.ballot_items)
        .filter(function (contest) {
          return contest.contest_type == 'Referendum'
        })
        .value()
    };
  }).then(function (contests) {
    utils.array_update(offices, contests.offices);
    utils.array_update(candidates, _(contests.offices)
      .map(function (office) {
        return office.candidates;
      })
      .flatten()
      .uniqBy(function (candidate) {
        return candidate.id;
      })
      .value()
    );
  });
}

module.exports = HomeController;
