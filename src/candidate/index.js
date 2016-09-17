'use strict';

var angular = require('angular');

angular.module('candidate', [
  require('../money')
])
  .component('candidatePage', {
    template: require('./candidate_page.html'),
    bindings: {
      candidate: '=',
      opposing: '=',
      supporting: '='
    }
  });


module.exports = 'candidate';
