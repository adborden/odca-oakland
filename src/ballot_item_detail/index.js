'use strict';

var angular = require('angular');
angular.module('ballot_item_detail', [])
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


function ReferendumDetailController ($route, static_api) {
  'ngInject';

  var referendum_id = $route.current.params.referendum_id;
  this.supporting = static_api.referendum.supporting({referendum_id: referendum_id});
  this.opposing = static_api.referendum.opposing({referendum_id: referendum_id});
}

function BallotItemDetailController ($scope) {
  'ngInject';

  var ctrl = this;
  $scope.$watch('$ctrl.ballot_item', function (ballot_item) {
    ctrl.heading = ballot_item.contest_type === 'Office' ?
      ballot_item.name :
      ballot_item.title;
  });
}


module.exports = 'ballot_item_detail';
