'use strict';

var angular = require('angular');

angular.module('committees.page', [
  require('../common')
])
  .component('committeePage', {
    template: require('./committee_page.html'),
    controller: CommitteePageController,
    bindings: {
      committee: '='
    }
  });

function CommitteePageController (pageTitle) {
  var ctrl = this;

  ctrl.committee.$promise.then(function (committee) {
    pageTitle(committee.name);
  });
}

module.exports = 'committees.page';
