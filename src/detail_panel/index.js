'use strict';

var angular = require('angular');
angular.module('detail_panel', [])
  .component('detailPanel', {
    template: require('./detail_panel.html'),
    bindings: {
      detail: '='
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
  var referendum_id = $route.current.params.referendum_id;
  this.supporting = static_api.referendum.supporting({referendum_id: referendum_id});
  this.opposing = static_api.referendum.opposing({referendum_id: referendum_id});
}


module.exports = 'detail_panel';
