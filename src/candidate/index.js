'use strict';

var angular = require('angular');

angular.module('candidate', [
  require('../money')
])
  .component('candidatePage', {
    template: require('./candidate_page.html'),
    controller: CandidatePageController,
    bindings: {
      candidate: '=',
      opposing: '=',
      supporting: '='
    }
  });

function CandidatePageController () {
  var ctrl = this;
  ctrl.onVisible = onVisible;

  ctrl.supporting.$promise.then(function (supporting) {
    ctrl.current_balance = supporting.total_contributions - supporting.total_expenditures + supporting.total_loans_received;
  });

  function onVisible ($el) {
    $el.removeClass('is-off-screen');
  }
}

module.exports = 'candidate';
