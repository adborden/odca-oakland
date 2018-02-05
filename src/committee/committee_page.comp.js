'use strict';

var angular = require('angular');
var utils = require('../utils');

angular.module('committees.page', [
  'ngTable',
  require('../common')
])
  .component('committeePage', {
    template: require('./committee_page.html'),
    controller: CommitteePageController,
    bindings: {
      committee: '='
    }
  });


function CommitteePageController (NgTableParams, pageTitle, static_api) {
  var ctrl = this;
  ctrl.referendums = [{number: 'A', title: 'foo'}];

  static_api.locality.current_ballot({locality_id: 2}).$promise.then(function (ballot) {
    var referendums = ballot.ballot_items.filter(function (elem) {
      return elem.contest_type === 'Referendum';
    });

    utils.array_update(ctrl.referendums, referendums);
  });

  ctrl.committee.$promise.then(function (committee) {
    pageTitle(committee.name);
  });

  ctrl.datatable = new NgTableParams({
    sorting: { number: 'asc' }
  }, {
    dataset: ctrl.referendums
  });
}


module.exports = 'committees.page';
