'use strict';

var angular = require('angular');

angular.module('committees.page', [])
  .component('committeePage', {
    template: require('./committee_page.html'),
    bindings: {
      committee: '='
    }
  });

module.exports = 'committees.page';
