'use strict';

var angular = require('angular');
angular.module('candidates', [
  require('./photo.filter')
])
  .component('candidateProfile', {
    template: require('./candidate_profile.html'),
    bindings: {
      candidate: '='
    }
  });


module.exports = 'candidates';
