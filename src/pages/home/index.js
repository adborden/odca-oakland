'use strict';

var _ = require('lodash');
var utils = require('../../utils');

function HomeController (ballot) {
  'ngInject';

  this.ballot = ballot;
  var candidates = this.candidates = [];

  ballot.$promise.then(function (ballot) {
    utils.array_update(candidates, _(ballot.ballot_items)
      .filter(function (contest) {
        return contest.contest_type == 'Office';
      })
      .map(function (office) {
        return office.candidates;
      })
      .flatten()
      .uniqBy(function (candidate) {
        return candidate.id;
      })
      .value());
  });
}

function ballot (static_api) {
  'ngInject';
  return static_api.locality.current_ballot({locality_id: 2}); // Oakland
}

module.exports = utils.route({
  controller: HomeController,
  template: require('./home.html'),
  resolve: {
    ballot: ballot
  }
});
