'use strict';

var angular = require('angular');
angular.module('candidates', [])
  .component('candidateProfile', {
    template: require('./candidate_profile.html'),
    controller: CandidateController,
    bindings: {
      candidate: '='
    }
  });

function CandidateController () {
  'ngInject';
}

module.exports = 'candidates';
