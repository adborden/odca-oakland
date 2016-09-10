'use strict';

var utils = require('../../utils');

function CandidateController (candidate, supporting, opposing) {
  'ngInject';

  this.candidate = candidate;
  this.supporting = supporting;
  this.opposing = opposing;
}

function candidate ($route, static_api) {
  'ngInject';
  return static_api.candidate.get({candidate_id: $route.current.params.candidate_id});
}

function opposing ($route, static_api) {
  'ngInject';
  return static_api.candidate.opposing({candidate_id: $route.current.params.candidate_id});
}

function supporting ($route, static_api) {
  'ngInject';
  return static_api.candidate.supporting({candidate_id: $route.current.params.candidate_id});
}

module.exports = utils.route({
  controller: CandidateController,
  template: require('./candidate.html'),
  resolve: {
    candidate: candidate,
    supporting: supporting,
    opposing: opposing
  }
});
