'use strict';

var angular = require('angular');
angular.module('ballot_item_detail', [
  require('../money')
])
  .component('ballotItemDetail', {
    template: require('./ballot_item_detail.html'),
    controller: BallotItemDetailController,
    bindings: {
      ballot_item: '=ballotItem'
    }
  })
  .component('officeDetail', {
    template: require('./office_detail.html'),
    bindings: {
      office: '='
    }
  })
  .component('referendumDetail', {
    template: require('./referendum_detail.html'),
    controller: ReferendumDetailController,
    bindings: {
      referendum: '='
    }
  });


function ReferendumDetailController ($scope, static_api) {
  var ctrl = this;

  $scope.$watch('$ctrl.referendum', function (referendum) {
    if (!referendum || !referendum.id) {
      return;
    }

    // Update supporting/opposing after the promise resolves to avoid updating
    // the view with an empty object
    static_api.referendum.supporting({referendum_id: referendum.id}).$promise.then(function (supporting) {
      ctrl.supporting = supporting;
    });
    static_api.referendum.opposing({referendum_id: referendum.id}).$promise.then(function (opposing) {
      ctrl.opposing = opposing;
    });
  });
}

function BallotItemDetailController ($scope) {
  var ctrl = this;
  $scope.$watch('$ctrl.ballot_item', function (ballot_item) {
    if (!ballot_item) {
      return;
    }

    ctrl.heading = ballot_item.contest_type === 'Office' ?
      ballot_item.name :
      ballot_item.title;
  });
}


module.exports = 'ballot_item_detail';
