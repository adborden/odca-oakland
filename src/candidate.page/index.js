'use strict';

var angular = require('angular');

angular.module('candidate.page', [
  require('../money')
])
  .component('candidatePage', {
    template: require('./candidate.html'),
    bindings: {
      candidate: '=',
      opposing: '=',
      supporting: '='
    }
  });


module.exports = 'candidate.page';
